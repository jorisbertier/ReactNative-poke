import { Image, View, StyleSheet, FlatList, Text } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import useThemeColors from "@/hooks/UseThemeColors";
import Card from "@/components/Card";

export default function Index() {
  const colors = useThemeColors();
  const pokemons = Array.from({length: 35}, (_, k) => ({
    name: 'Pokemon name',
    id: k + 1
  }))

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/pokeball.png')} width={50} height={50}/>
        <ThemedText variant="headline" color="grayLight">Pokedex</ThemedText>
      </View>
      <Card style={styles.body}>
        <FlatList
        data={pokemons}
        numColumns={3}
        contentContainerStyle={[styles.gridGap, styles.list]}
        columnWrapperStyle={styles.gridGap}
        renderItem={({item}) => <Card style={{flex: 1/3,height: 200, alignItems: 'center'}}>
          <Text>{item.name}</Text>
        </Card>} keyExtractor={(item) => item.id.toString()}>

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
