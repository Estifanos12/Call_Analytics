import { StyleSheet, Linking, TouchableOpacity, View } from "react-native";
import Icons from "react-native-vector-icons/Ionicons"

export default function ContactRightHeader({ phone }) {
    return (
        <View
            style={styles.container}
        >
            <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${phone}`)}
            >
                <View style={styles.iconCircle}>
                    <Icons name="call" size={20} color={"green"} style={styles.icon} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => Linking.openURL(`sms:${phone}`)}
            >
                <View style={styles.iconCircle}>
                    <Icons name="mail" size={22} color={"orange"} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderWidth: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 3
    }
});
