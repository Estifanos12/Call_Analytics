import { StyleSheet, Text, View, Linking, TouchableOpacity } from "react-native";

export default function ErrorScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>You have to grant call logs permission to use this app</Text>
            <TouchableOpacity
                onPress={() => Linking.openSettings()}
            >
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Open Settings</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontWeight: "500",
        fontSize: 14
    },
    button: {
        backgroundColor: "#0074CC",
        marginTop: 10,
        padding: 12,
        borderRadius: 7
    },
    buttonText: {
        color: "white"
    }
});
