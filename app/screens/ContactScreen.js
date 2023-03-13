import { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import PieChart from "react-native-pie-chart";
import Icon from "react-native-vector-icons/Ionicons"
import Icons from "react-native-vector-icons/FontAwesome5"

import { ThemeContext } from "../context/themeContext";
import { colorPalette } from "../utils/color";

const { width } = Dimensions.get('window');
const gap = 5;
const itemPerRow = 2;
const totalGapSize = (itemPerRow - 1) * gap;
const windowWidth = width;
const childWidth = ((windowWidth - totalGapSize) / itemPerRow) - 5;
const date = new Date()

export default function ContactScreen({ route }) {
    const widthAndHeight = 270
    const sliceColor = ['#F44336', '#2196F3', '#4CAF50', "#964B00"]
    let no_of_missed_call = 0
    let no_of_incoming_call = 0
    let no_of_outgoing_call = 0
    let no_of_other_call = 0
    let minDuration = 0
    let maxDuration = 0

    const [call, setCall] = useState({
        missed: 0,
        incoming: 0,
        outgoing: 0,
        other: 0,
        minDuration: 0,
        maxDuration: 0
    });

    const [loaded, setLoaded] = useState(false);

    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        route.params.log.type.forEach(type => {
            if (type === "MISSED") no_of_missed_call++
            if (type === "OUTGOING") no_of_outgoing_call++
            if (type === "INCOMING") no_of_incoming_call++
            if (type === "UNKNOWN") no_of_other_call++
        })

        route.params.log.duration.forEach(log => {
            if (log > maxDuration) maxDuration = log
            if (log < minDuration) minDuration = log
        })

        setCall({
            missed: no_of_missed_call,
            incoming: no_of_incoming_call,
            outgoing: no_of_outgoing_call,
            other: no_of_other_call,
            minDuration: minDuration,
            maxDuration: maxDuration
        })
        setLoaded(true)
    }, [route.params])

    const legendData = [
        {
            label: "Total Calls",
            calls: route.params.log.type.length,
            color: "black"
        },
        {
            label: "Missed Calls",
            calls: call.missed,
            color: "#F44336"
        },
        {
            label: "Incoming Calls",
            calls: call.incoming,
            color: "#4CAF50"
        },
        {
            label: "Outgoing Calls",
            calls: call.outgoing,
            color: "#2196F3"
        },
        {
            label: "Others",
            calls: call.other,
            color: "#964B00"
        },
    ]

    return (
        <ScrollView>
            <View style={[styles.container, {
                backgroundColor: theme === "light" ? colorPalette.light.bg : colorPalette.dark.bg
            }]}>
                <View style={styles.pieChartContainer}>
                    <View style={styles.pieChartHeader}>
                        <Icon name="stats-chart" size={15} color={theme === "light" ? colorPalette.light.textLight : colorPalette.dark.textWhite} />
                        <Text style={[styles.chartText, {
                            color: theme === "light" ? colorPalette.light.textLight : colorPalette.dark.textWhite
                        }]}>Chart Analysis</Text>
                    </View>
                    {
                        loaded &&
                        <PieChart
                            widthAndHeight={widthAndHeight}
                            series={[call.missed, call.outgoing, call.incoming, call.other]}
                            sliceColor={sliceColor}
                            doughnut={true}
                            coverRadius={0.45}
                            coverFill={theme === "light" ? colorPalette.light.bg : colorPalette.dark.bg}
                        />
                    }

                </View>
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
                                <Text
                                    style={{
                                        color: theme === "light" ? colorPalette.light.textLight : colorPalette.dark.textWhite
                                    }}
                                >{data.label} - {data.calls}</Text>
                            </View>
                        ))
                    }
                </View>
                <View style={styles.infoContainer}>
                    <Icons name="question-circle" size={17}
                        color={theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite}
                        style={{ marginRight: 4 }}
                    />
                    <Text style={[styles.infoTitle, {
                        color: theme === "light" ? colorPalette.light.textLight : colorPalette.dark.textWhite

                    }]}>Call Info</Text>
                </View>
                <View style={[styles.info, {
                    backgroundColor: theme === "light" ? colorPalette.light.bgLight : colorPalette.dark.bgLight
                }]}>
                    <View style={[styles.flex, {
                        backgroundColor: theme === "light" ? colorPalette.light.bg : colorPalette.dark.bg
                    }]}>
                        <Text style={[styles.text, styles.textTitle, {
                            color: theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite
                        }]}>Total Call: </Text>
                        <Text style={{
                            color: theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite
                        }}>{route.params.log.duration.length} {route.params.log.duration.length > 1 ? "calls" : "call"}</Text>
                    </View>
                    <View style={[styles.flex, {
                        backgroundColor: theme === "light" ? colorPalette.light.bg : colorPalette.dark.bg
                    }]}>
                        <Text style={[styles.text, styles.textTitle, {
                            color: theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite
                        }]}>Total Duration: </Text>
                        <Text style={{
                            color: theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite
                        }}>{route.params.totalDuration} sec</Text>
                    </View>
                    <View style={[styles.flex, {
                        backgroundColor: theme === "light" ? colorPalette.light.bg : colorPalette.dark.bg
                    }]}>
                        <Text style={[styles.text, styles.textTitle, {
                            color: theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite
                        }]}>Maximum Duration: </Text>
                        <Text style={{
                            color: theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite
                        }}>{call.maxDuration} sec</Text>
                    </View>
                    <View style={[styles.flex, {
                        backgroundColor: theme === "light" ? colorPalette.light.bg : colorPalette.dark.bg
                    }]}>
                        <Text style={[styles.text, styles.textTitle, {
                            color: theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite
                        }]}>Minimum Duration: </Text>
                        <Text style={{
                            color: theme === "light" ? colorPalette.light.textBlack : colorPalette.dark.textWhite
                        }}>{call.minDuration} sec</Text>
                    </View>
                </View>
                <View
                    style={{
                        marginVertical: 20
                    }}
                >
                    <Text style={{
                        color: colorPalette.light.bgLight,
                        textAlign: "center"
                    }}>End of info</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pieChartContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20
    },
    pieChartHeader: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        marginBottom: 20
    },
    chartText: {
        width: "100%",
        marginLeft: 6,
        fontSize: 14,
    },
    legendContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: -(gap / 2),
        marginHorizontal: 2,
        marginTop: 15,
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
    infoContainer: {
        marginVertical: 26,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: "500"
    },
    info: {
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 7,
        marginTop: -7,
        marginBottom: 20
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
        padding: 10,
        borderRadius: 7
    },
    textTitle: {
        fontWeight: "500"
    }
});
