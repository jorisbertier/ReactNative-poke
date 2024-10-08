import { Image, View, StyleSheet, FlatList, Text, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import useThemeColors from "@/hooks/UseThemeColors";
import Card from "@/components/Card";
import { PokemonCard } from "@/components/PokemonCard";
import {  useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { getPokemonId } from '../functions/pokemon';
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import Row from "@/components/Row";
import SortButton from "@/components/SortButton";
import { RootView } from "@/components/RootView";

export default function Index() {
  const colors = useThemeColors();

  const { data, isFetching, fetchNextPage } = useInfiniteFetchQuery('/pokemon?limit=21')
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<"id" | "name">("id") 

  // const pokemons = data?.pages.flatMap((page) => page.results.map((r) => ({name: r.name, id : getPokemonId(r.url)}))) ?? []
  const pokemons = data?.pages.flatMap((page) => {
    if ('results' in page) {
      return page.results.map((r) => ({
        name: r.name,
        id: getPokemonId(r.url),
      }))
    }
    return []
  }) ?? []
  const filteredPokemons = [...search ? pokemons.filter(p => p.name.includes(search.toLocaleLowerCase())
  || p.id.toString() === search) : pokemons].sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1));

  return (
    <RootView>
      <Row style={styles.header} gap={16}>
        <Image source={require('@/assets/images/pokeball.png')} width={50} height={50}/>
        <ThemedText variant="headline" color="grayLight">Pokedex</ThemedText>
      </Row>
      <Row gap={16} style={styles.form}>
        <SearchBar value={search} onChange={setSearch}/>
        <SortButton value={sortKey} onChange={setSortKey}></SortButton>
      </Row>
      <Card style={styles.body}>
        <FlatList
        data={filteredPokemons}
        numColumns={3}
        ListFooterComponent={
          isFetching ? <ActivityIndicator color={colors.tint}/> : null
        }
        contentContainerStyle={[styles.gridGap, styles.list]}
        columnWrapperStyle={styles.gridGap}
        onEndReached={search ? undefined : () => fetchNextPage()}
        renderItem={({item}) => <PokemonCard  key={item.id.toString()} id={(item.id)} name={item.name} style={{flex: 1/3,height: 200, alignItems: 'center'}}/>}
        keyExtractor={(item) => item.id.toString()}
        >

        </FlatList>
      </Card>
    </RootView>
  );
}


const styles = StyleSheet.create({

  header: {
    paddingHorizontal: 12,
    paddingBottom: 8
  },

  body: {
    flex: 1,
    marginTop: 16,
  },

  gridGap : {
    gap: 8
  },
  list: {
    padding: 12,
    
  },
  form: {
    paddingHorizontal: 12
  }
})
