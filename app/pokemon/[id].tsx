import { RootView } from '@/components/RootView';
import Row from '@/components/Row';
import { ThemedText } from '@/components/ThemedText';
import { useFetchQuery } from '@/hooks/useFetchQuery';
import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

export default function Pokemon() {

    const params = useLocalSearchParams() as {id: string}
    const { data:pokemon } = useFetchQuery("/pokemon/[id]", {id: params.id})
    return (
        <RootView>
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
        </RootView>
    )
}

const styles = StyleSheet.create({
    header: {
        margin:20,
        justifyContent: 'space-between'
    }
})