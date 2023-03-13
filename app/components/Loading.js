import { StyleSheet, ActivityIndicator, View } from "react-native";

export default function Loading() {
    return (
        <View
            style={styles.loadingContainer}
        >
            <ActivityIndicator
                color={"#377fad"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
