import { Image, View, StyleSheet, FlatList, Text, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import useThemeColors from "@/hooks/UseThemeColors";
import Card from "@/components/Card";
import { PokemonCard } from "@/components/PokemonCard";
import { useFetchQuery, useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { getPokemonId } from '../functions/pokemon';
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

export default function Index() {
  const colors = useThemeColors();

  const { data, isFetching, fetchNextPage } = useInfiniteFetchQuery('/pokemon?limit=21')

  const pokemons = data?.pages.flatMap(page => page.results) ?? []
  const [search, setSearch] = useState('')

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/pokeball.png')} width={50} height={50}/>
        <ThemedText variant="headline" color="grayLight">Pokedex</ThemedText>
      </View>
      <View>
        <SearchBar value={search} onChange={setSearch}/>
      </View>
      <Card style={styles.body}>
        <FlatList
        data={pokemons}
        numColumns={3}
        ListFooterComponent={
          isFetching ? <ActivityIndicator color={colors.tint}/> : null
        }
        contentContainerStyle={[styles.gridGap, styles.list]}
        columnWrapperStyle={styles.gridGap}
        onEndReached={() => fetchNextPage()}
        renderItem={({item}) => <PokemonCard id={getPokemonId(item.url)} name={item.name} style={{flex: 1/3,height: 200, alignItems: 'center'}}/>}
        keyExtractor={(item) => item.url}>

        </FlatList>
      </Card>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  container: {
    backgroundColor: 'red',
    flex: 1,
    padding: 4
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 12,
  },

  body: {
    flex: 1
  },

  gridGap : {
    gap: 8
  },
  list: {
    padding: 12,
    
  }
})
