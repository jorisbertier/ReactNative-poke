import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedText variant="headline">Pokedex</ThemedText>
    </SafeAreaView>
  );
}

// const styles = {
//   container: {backgroundColor: 'red', padding: 24}
// }

const styles = StyleSheet.create({
  container: {backgroundColor: 'red', padding: 24, flex: 1}
})
