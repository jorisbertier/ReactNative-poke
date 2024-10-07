import useThemeColors from '@/hooks/UseThemeColors';
import {StyleSheet, ViewProps, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = ViewProps

export function RootView({style, ...rest}: Props) {
    const colors = useThemeColors()
    return(
        <SafeAreaView style={[rootStyle, { backgroundColor: colors.tint}]} {...rest}></SafeAreaView>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         flex
//     }
// })

const rootStyle = {
    flex: 1,
    padding: 4
} satisfies ViewStyle