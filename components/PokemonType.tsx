import { Colors } from "@/constants/Color"
import { View, ViewStyle } from "react-native"
import { ThemedText } from "./ThemedText"

type Props = {
    name: keyof (typeof Colors)['type']
}

export default function PokemonType({name}: Props) {
    return (
        <View style={[rootStyle, {backgroundColor: Colors.type[name]}]}>
            <ThemedText style={{textTransform: "capitalize"}}color="grayWhite" variant={"subtitle2"}>{name}</ThemedText>
        </View>
    )
}

const rootStyle = {
    flex: 0,
    height: 20,
    paddingHorizontal: 8,
    borderRadius: 8
} satisfies ViewStyle