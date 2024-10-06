import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Color";

export default function useThemeColors() {

    const theme = useColorScheme() ?? "light";
    
    return Colors[theme]
}