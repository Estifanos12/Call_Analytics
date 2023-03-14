import { useContext } from "react"
import { StyleSheet, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Entypo"


import HomeScreen from "../screens/HomeScreen";
import ContactScreen from "../screens/ContactScreen";
import HeaderTitle from "../components/HeaderTitle";
import ContactHeader from "../components/ContactHeader";
import ContactRightHeader from "../components/ContactRightHeader";
import { ThemeContext } from "../context/themeContext";
import { colorPalette } from "../utils/color";

const Stack = createNativeStackNavigator()

export default function StackNavigation({ data, filteredData, searchLogs, searchTerm, chartData, totalCall }) {
    const { theme, setTheme } = useContext(ThemeContext)
    return (
        <Stack.Navigator
        >
            <Stack.Screen name="Home"
                options={
                    {
                        headerStyle: { backgroundColor: theme === "light" ? colorPalette.light.bg : colorPalette.dark.bgLight },
                        headerShown: filteredData.length === 0 ? false : true,
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => {
                                    setTheme(prev => (prev === "light" ? "dark" : "light"))
                                }}
                            >
                                <Icon name="light-up" size={20} color={theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite} />
                            </TouchableOpacity>
                        ),
                        headerTitle: () => <HeaderTitle />
                    }}>
                {(props) => <HomeScreen {...props} data={data} filteredData={filteredData} searchLogs={searchLogs} chartData={chartData} totalCall={totalCall} searchTerm={searchTerm} />}
            </Stack.Screen>
            <Stack.Screen
                name="Contact"
                component={ContactScreen}
                options={({ route }) => ({
                    headerRight: () => (<ContactRightHeader phone={route.params.log.phone} />),
                    headerTitle: () => (<ContactHeader name={route.params.log.name} phone={route.params.log.phone} />),
                    headerStyle: { backgroundColor: theme === "light" ? colorPalette.light.bg : colorPalette.dark.bgLight },
                })}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({});
