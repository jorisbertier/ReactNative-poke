import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import useThemeColors from "@/hooks/UseThemeColors";

export default function Index() {
  const colors = useThemeColors();

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
      <ThemedText variant="headline" color="grayWhite">Pokedex</ThemedText>
    </SafeAreaView>
  );
}

// const styles = {
//   container: {backgroundColor: 'red', padding: 24}
// }

const styles = StyleSheet.create({
  container: {backgroundColor: 'red', padding: 24, flex: 1}
})
