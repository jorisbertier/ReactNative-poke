import Card from '@/components/Card';
import PokemonSpec from '@/components/Pokemon/PokemonSpec';
import { PokemonStat } from '@/components/Pokemon/PokemonStat';
import PokemonType from '@/components/PokemonType';
import { RootView } from '@/components/RootView';
import Row from '@/components/Row';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Color';
import { basePokemonStats, formatedWeight, getPokemonArtwork } from '@/functions/pokemon';
import { useFetchQuery } from '@/hooks/useFetchQuery';
import useThemeColors from '@/hooks/UseThemeColors';
import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { Audio } from 'expo-av';

export default function Pokemon() {

    const colors = useThemeColors();
    const params = useLocalSearchParams() as {id: string};
    const { data:pokemon } = useFetchQuery("/pokemon/[id]", {id: params.id});
    const id = parseInt(params.id)
    const { data:species } = useFetchQuery("/pokemon-species/[id]", {id: params.id})
    const mainType = pokemon?.types[0].type.name;
    const colorType = mainType ? Colors.type[mainType] : colors.tint;
    const types = pokemon?.types ?? [];

    const bio = species?.flavor_text_entries
    ?.find(({ language }) => language.name === 'en')
    ?.flavor_text.replaceAll('\n', '. ');

    const stats = pokemon?.stats ?? basePokemonStats;

    const onImagePress = async () => {
        const cry = pokemon?.cries.latest;
        if(!cry) {
            return
        }
        const {sound} = await Audio.Sound.createAsync({
            uri: cry
        }, {shouldPlay: true})

        sound.playAsync()
    }

    const onPrevious = () => {
        router.replace({pathname: '/pokemon/[id]', params: {id: Math.max(id - 1, 1)}})
    }

    const onNext = () => {
        router.replace({pathname: '/pokemon/[id]', params: {id: Math.min(id + 1, 151)}})
    }

    return (
        <RootView backgroundColor={colorType}>
            <View>
                <Image style={styles.pokeball} source={require('@/assets/images/poke.png')} width={208} height={208}/>
                <Row style={styles.header}>
                    <Pressable onPress={router.back}>
                            <Image source={require('@/assets/images/arrow_back.png')} style={{ width: 32, height: 32 }} />
                    </Pressable>
                    <ThemedText color="grayWhite" variant="headline" style={{textTransform: 'capitalize'}}>
                        {pokemon?.name}
                    </ThemedText>
                    
                        <ThemedText color="grayWhite" variant="subtitle2">#{params.id.padStart(3, '0')}</ThemedText>
                    
                </Row>
                <View style={styles.body}>
                    <Row style={styles.imageRow}>
                        {id === 1 ? (
                            <View style={{width: 24}}></View>
                        ) : (
                        <Pressable onPress={onPrevious}>
                            <Image source={require('@/assets/images/chevron_left.png')} height={24} width={24}/>
                        </Pressable>
                        )}
                        <Pressable onPress={onImagePress}>
                            <Image
                            style={{
                                ...styles.artwork
                            }}
                            source={{uri: getPokemonArtwork(params.id)}}
                            width={200}
                            height={200}
                            />
                        </Pressable>
                        {id === 151 ? (
                        <View style={{width: 24}}></View>
                        ) : (
                        <Pressable onPress={onNext}>
                            <Image source={require('@/assets/images/chevron_right.png')} height={24} width={24}/>
                        </Pressable>
                        )}
                    </Row>
                </View>
                <Card style={styles.card}>
                    <Row gap={16} style={{height: 20}}>
                        {types.map(type => <PokemonType name={type.type.name} key={type.type.name}/>)}
                    </Row>
                    
                    <ThemedText variant="subtitle1" style={{color: colorType}}>About</ThemedText>
                    <Row>
                        <PokemonSpec style={{borderStyle: 'solid', borderRightWidth: 1, borderColor: colors.grayLight}} title={formatedWeight(pokemon?.weight)} description="Weight" image={require('@/assets/images/weight.png')}></PokemonSpec>
                        <PokemonSpec style={{borderStyle: 'solid', borderRightWidth: 1, borderColor: colors.grayLight}} title={formatedWeight(pokemon?.height)} description="Size" image={require('@/assets/images/straighten.png')}></PokemonSpec>
                        <PokemonSpec title={pokemon?.moves.slice(0, 2).map(m => m.move.name).join('\n')} description={'Moves'}></PokemonSpec>
                    </Row>
                    <ThemedText>{bio}</ThemedText>

                    {/* Stats */}
                    <ThemedText variant="subtitle1" style={{color: colorType}}>Base stat</ThemedText>
                    <View style={{alignSelf: 'stretch'}}>
                        {stats.map(stat => <PokemonStat key={stat.stat.name} name={stat.stat.name} value={stat.base_stat} color={colorType}/>)}
                    </View>
                </Card>
            </View>
        </RootView>
    )
}

const styles = StyleSheet.create({
    header: {
        margin:20,
        justifyContent: 'space-between'
    },
    pokeball: {
        position: 'absolute',
        right: 8,
        top: 8
    },
    imageRow : {
        position: 'absolute',
        top: -140,
        zIndex: 2,
        justifyContent: 'space-between',
        left: 0,
        right: 0,
        paddingHorizontal: 20
        
    },
    artwork: {
    },
    body : {
        marginTop: 144,
    },
    card : {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        gap: 16,
        alignItems: 'center'
    }
})