import { useContext } from "react"
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"

import { colorPalette } from "../utils/color";
import { ThemeContext } from "../context/themeContext";


export default function HeaderTitle() {
    const { theme } = useContext(ThemeContext)
    return (
        <View style={styles.container}>
            <Icon name="call" size={19.5} color={theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite} />
            <Text style={[styles.logoTitle, { color: theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite }]}>Call Analytics</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logoTitle: {
        fontSize: 19,
        fontWeight: "400",
        marginLeft: 5
    }
});
