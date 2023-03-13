import { StyleSheet, TextInput, View } from "react-native";
import { useContext } from "react";
import Icons from "react-native-vector-icons/AntDesign"

import { ThemeContext } from "../context/themeContext";
import { colorPalette } from "../utils/color";

export default function Search({ searchLogs }) {

    const { theme } = useContext(ThemeContext)
    return (
        <View
            style={[styles.container, {
                backgroundColor: theme === "light" ? colorPalette.light.bgLight : colorPalette.dark.bgLight
            }]}
        >
            <Icons name="search1" size={18} style={styles.icon} color={theme === "light" ? colorPalette.light.textLight : colorPalette.dark.textWhite} />
            <TextInput
                placeholder="Search name"
                onChangeText={(value) => searchLogs(value)}
                style={[styles.input, {
                    color: theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textLight
                }]}
                placeholderTextColor={theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textLight}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 7,
        borderRadius: 7,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    input: {
        width: "100%",
    },
    icon: {
        marginHorizontal: 4
    }
});
