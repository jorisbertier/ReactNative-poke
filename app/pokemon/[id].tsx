import { RootView } from '@/components/RootView';
import Row from '@/components/Row';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Color';
import { useFetchQuery } from '@/hooks/useFetchQuery';
import useThemeColors from '@/hooks/UseThemeColors';
import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';


export default function Pokemon() {

    const colors = useThemeColors()
    const params = useLocalSearchParams() as {id: string}
    const { data:pokemon } = useFetchQuery("/pokemon/[id]", {id: params.id})
    const mainType = pokemon?.types[0].type.name
    const colorType = mainType ? Colors.type[mainType] : colors.tint
    console.log({colorType, mainType})
    return (
        <RootView style={{backgroundColor: colorType}}>
            <View>
                <Image style={styles.pokeball} source={require('@/assets/images/poke.png')} width={208} height={208}/>
                <Pressable onPress={router.back}>
                    <Row style={styles.header}>
                        <Image source={require('@/assets/images/arrow_back.png')} style={{ width: 32, height: 32 }} />
                        <ThemedText color="grayWhite" variant="headline">
                            {pokemon?.name}
                        </ThemedText>
                    </Row>
                </Pressable>
                <ThemedText color="grayWhite" variant="subtitle2">{params.id.padStart(3, '0')}</ThemedText>
                <Text>Pokemon {params.id}</Text>
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
    }
})