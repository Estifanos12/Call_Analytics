import { useState, useEffect } from "react"
import { SafeAreaView, PermissionsAndroid, StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import CallLogs from "react-native-call-log"

import ErrorScreen from "./app/screens/ErrorScreen";
import Loading from "./app/components/Loading";
import StackNavigation from "./app/navigation/StackNavigation";
import ThemeProvider from "./app/context/themeContext";

export default function App() {

  const [logData, setLogData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [chartData, setChartData] = useState([1, 1, 1, 1])
  const [totalCall, setTotalLogs] = useState(0)
  const [accessGranted, setAccessGranted] = useState(null);

  let no_of_missed_call = 0
  let no_of_incoming_call = 0
  let no_of_outgoing_call = 0
  let no_of_other_call = 0


  const formatLogs = (data) => {
    const logs = []
    data.forEach((d) => {
      let exists = false;
      logs.forEach((log) => {
        if (log.phone === d.phoneNumber) {
          exists = true
          log.duration.push(d.duration)
          log.type.push(d.type)
        }
      })
      if (!exists) {
        logs.push({
          name: d.name || "Unknown",
          duration: [d.duration],
          type: [d.type],
          phone: d.phoneNumber,
        })
      }
    }

    )
    return logs
  }


  const loadLogs = () => {
    CallLogs.loadAll()
      .then(data => {
        setLogData(formatLogs(data))
        setFilteredData(formatLogs(data))
        data.forEach(d => {
          if (d.type === "MISSED") no_of_missed_call += 1
          if (d.type === "INCOMING") no_of_incoming_call += 1
          if (d.type === "OUTGOING") no_of_outgoing_call += 1
        })
        no_of_other_call = totalCall - (no_of_incoming_call + no_of_missed_call + no_of_outgoing_call)
        setTotalLogs(data.length)
        setChartData([no_of_missed_call, no_of_incoming_call, no_of_outgoing_call, no_of_other_call < 0 ? 1 : no_of_other_call
        ])
      })
  }

  const getCallLogs = async () => {
    try {
      const checkCallPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CALL_LOG)

      if (checkCallPermission) {
        setAccessGranted(true)
        loadLogs()
      }
      else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setAccessGranted(true)
          loadLogs()
        } else {
          setAccessGranted(false)
        }
      }
    } catch (error) {
      console.log(error)
    }

  }

  const searchLogs = (value) => {
    if (value) {
      setFilteredData(logData.filter(log => log.name.toLowerCase().includes(value.toLowerCase().trim())))
    }
    else {
      setFilteredData(logData)
    }
  }

  useEffect(() => {
    getCallLogs()
  }, [])

  if (accessGranted === null) {
    return (
      <Loading />
    )
  }
  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        {
          accessGranted === false ? <ErrorScreen />
            : (
              <NavigationContainer>
                <StackNavigation data={logData} filteredData={filteredData} searchLogs={searchLogs} chartData={chartData} totalCall={totalCall} />
              </NavigationContainer>)
        }
      </SafeAreaView>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
}) 