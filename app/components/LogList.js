import { StyleSheet, View, Text } from "react-native";
import { useContext } from 'react'

import LogCard from "./LogCard";
import { ThemeContext } from "../context/themeContext";
import { colorPalette } from "../utils/color";

export default function LogList({ data }) {

    const { theme } = useContext(ThemeContext)

    return (
        <View
            style={[styles.container]}
        >

            {
                data.length !== 0 ? data.map((d, index) => <LogCard key={d.phone} log={d} index={index} />)
                    : (<View
                        style={styles.notFound}
                    >
                        <Text style={{
                            color: theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite
                        }}>No contact found</Text>
                    </View>)
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },

    listContainer: {
        marginVertical: 10,
    },
    notFound: {
        marginVertical: 40,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
});
