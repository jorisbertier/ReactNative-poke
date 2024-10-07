import useThemeColors from "@/hooks/UseThemeColors"
import { Image, type ImageSourcePropType, StyleSheet, View, type ViewProps } from "react-native"
import Row from "../Row";
import { ThemedText } from "../ThemedText";

type Props = ViewProps & {
    title?: string,
    description?: string,
    image?: ImageSourcePropType
}
export default function PokemonSpec({style, image, title, description, ...rest}: Props) {
    const colors = useThemeColors();
    return(
        <View style={[style, styles.root]} {...rest}>
            <Row style={styles.row}>
                {image && <Image source={image} width={16} height={16}/>}
                <ThemedText>{title}</ThemedText>
            </Row>
            <ThemedText variant="caption" color="grayMedium">{description}</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        gap: 4,
        alignItems: 'center'
    },
    row : {
        height: 32,
        alignItems: 'center'
    }
})