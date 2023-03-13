import { useContext } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import PieChart from "react-native-pie-chart";
import Icon from "react-native-vector-icons/Ionicons"
import Icons from "react-native-vector-icons/FontAwesome5"

import Search from "../components/Search";
import LogList from "../components/LogList";
import Loading from "../components/Loading";
import { ThemeContext } from "../context/themeContext";
import { colorPalette } from "../utils/color";

const { width } = Dimensions.get('window');
const gap = 5;
const itemPerRow = 2;
const totalGapSize = (itemPerRow - 1) * gap;
const windowWidth = width;
const childWidth = ((windowWidth - totalGapSize) / itemPerRow) - 5;

export default function HomeScreen({ data, filteredData, searchLogs, chartData, totalCall }) {

    const widthAndHeight = 270
    const sliceColor = ['#F44336', '#4CAF50', '#2196F3', "#964B00"]
    const totalSum = chartData[0] + chartData[1] + chartData[2]
    const { theme } = useContext(ThemeContext)

    const legendData = [
        {
            label: "Total Calls",
            calls: totalCall,
            color: "black"
        },
        {
            label: "Missed Calls",
            calls: chartData[0],
            color: "#F44336"
        },
        {
            label: "Incoming Calls",
            calls: chartData[1],
            color: "#4CAF50"
        },
        {
            label: "Outgoing Calls",
            calls: chartData[2],
            color: "#2196F3"
        },
        {
            label: "Others",
            calls: totalCall - totalSum,
            color: "#964B00"
        },
    ]
    if (data.length === 0) {
        return (<Loading />)
    }
    return (
        <ScrollView style={[styles.container, {
            backgroundColor: theme === "light" ? colorPalette.light.bg : colorPalette.dark.bg
        }]} >
            <View
                style={styles.pieChartContainer}
            >
                <View style={styles.pieChartHeader}>
                    <Icon name="stats-chart" size={15} color={theme === "light" ? colorPalette.light.textLight : colorPalette.dark.textWhite} />
                    <Text style={[styles.chartText, {
                        color: theme === "light" ? colorPalette.light.textLight : colorPalette.dark.textWhite
                    }]}>Chart Analysis</Text>
                </View>
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={chartData}
                    sliceColor={sliceColor}
                    doughnut={true}
                    coverRadius={0.45}
                    coverFill={theme === "light" ? colorPalette.light.bg : colorPalette.dark.bg}
                    style={{
                        borderWidth: 0,
                        elevation: 2
                    }}
                />
                <View style={styles.legendContainer}>
                    {
                        legendData.map(data => (
                            <View key={data.label} style={[styles.legend, {
                                marginHorizontal: gap / 2,
                                minWidth: childWidth,
                                maxWidth: childWidth,
                                backgroundColor: theme === "light" ? colorPalette.light.bg : colorPalette.dark.bgLight
                            }]}>
                                <View style={[styles.circle, { backgroundColor: data.color }]} />
                                <Text style={{
                                    color: theme === "light" ? colorPalette.light.textLight : colorPalette.dark.textWhite
                                }}>{data.label} - {data.calls}</Text>
                            </View>
                        ))
                    }
                </View>
            </View>
            <View style={styles.logoHeader}>
                <Icons name="users" size={21} color={theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite} />
                <Text style={[styles.text, {
                    color: theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite
                }]}>Contacts</Text>
            </View>
            <View
                style={styles.searchContainer}
            >
                <Search searchLogs={searchLogs} />
            </View>
            <LogList data={filteredData} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchContainer: {
        marginBottom: 15,
        paddingHorizontal: 10
    },
    chartText: {
        width: "100%",
        marginLeft: 6,
        fontSize: 14,
    },
    pieChartContainer: {
        marginTop: 20,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    pieChartHeader: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        marginBottom: 17
    },
    legendContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: -(gap / 2),
        marginHorizontal: 2,
        marginTop: 23,
    },
    legend: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: 5,
        borderWidth: 0,
        padding: 15,
        elevation: 2,
    },
    circle: {
        width: 15,
        height: 15,
        borderRadius: 50,
        marginRight: 4
    },
    logoHeader: {
        flexDirection: "row",
        alignItems: "center",
        justiyContent: "flex-start",
        marginTop: 28,
        marginBottom: 20,
        paddingHorizontal: 10
    },
    text: {
        fontWeight: "600",
        fontSize: 18,
        color: "black",
        marginLeft: 5
    },
});
