import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ThemeContext } from "../context/themeContext";
import { colorPalette } from "../utils/color";

export default function ContactHeader({ name, phone }) {
    const { theme, setTheme } = useContext(ThemeContext)
    return (
        <View style={styles.container}>
            <Text style={[styles.name, { color: theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite }]}>{name}</Text>
            <Text style={[styles.phone, { color: theme === "light" ? colorPalette.light.textLight : colorPalette.dark.textLight }]}>{phone}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start",
        justifyContent: "center",
        marginLeft: -10
    },
    name: {
        fontSize: 18,
        color: "black"
    },
    phone: {
        fontSize: 13
    }
});
