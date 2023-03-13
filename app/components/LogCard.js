import { useContext } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ThemeContext } from "../context/themeContext";
import { colorPalette } from "../utils/color";

export default function LogCard({ log, index }) {

    const { theme } = useContext(ThemeContext)
    const navigation = useNavigation()
    const totalDuration = log.duration.reduce((acc, data) =>
        acc += data
        , 0)

    return (
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Contact", { log: log, totalDuration: totalDuration })}
        >
            <View
                style={[styles.container, {
                    backgroundColor: theme === "light" ? colorPalette.light.bg : colorPalette.dark.bgLight
                }]}
            >
                <View style={styles.cardHeader}>
                    <Text style={[styles.name, {
                        color: theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite
                    }]}>{index + 1}. {log.name}</Text>
                    <Text style={[styles.phone, {
                        color: theme === "light" ? colorPalette.light.textLight : colorPalette.dark.textWhite
                    }]}>{log.phone}</Text>
                </View>

                <View style={[styles.cardBody, {
                    backgroundColor: theme === "light" ? colorPalette.light.bgLight : colorPalette.dark.bg

                }]}>
                    <View style={styles.flex}>
                        <Text
                            style={{
                                color: theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite
                            }}
                        >Total Call: </Text>
                        <Text
                            style={{
                                color: theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite
                            }}
                        >{log.duration.length}</Text>
                    </View>

                    <View style={styles.flex}>
                        <Text
                            style={{
                                color: theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite
                            }}
                        >Total Duration: </Text>
                        <Text
                            style={{
                                color: theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite
                            }}
                        >{totalDuration} sec</Text>
                    </View>
                </View>

            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        borderWidth: 0,
        padding: 10,
        elevation: 1,
    },
    name: {
        fontWeight: "500",
        fontSize: 16
    },
    phone: {
        color: "black"
    },
    cardHeader: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },
    cardBody: {
        marginTop: 5,
        padding: 10,
        borderRadius: 7
    },
    flex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }

});
