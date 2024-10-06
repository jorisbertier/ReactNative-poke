import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import useThemeColors from "@/hooks/UseThemeColors";
import Card from "@/components/Card";

export default function Index() {
  const colors = useThemeColors();

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
      <Card>
        <ThemedText variant="headline" color="grayDark">Pokedex</ThemedText>
      </Card>
    </SafeAreaView>
  );
}

// const styles = {
//   container: {backgroundColor: 'red', padding: 24}
// }

const styles = StyleSheet.create({
  container: {backgroundColor: 'red', padding: 24, flex: 1}
})
