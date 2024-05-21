import { Platform, SafeAreaView, StatusBar, StyleSheet, } from "react-native"
import Navigator from "./src/navigation/Navigator"
import { Provider } from "react-redux"
import store from "./src/store"
import { ToastProvider } from 'react-native-toast-notifications'
import { initDB } from "./src/databases/sqlLite"

(async () => {
  try {
    if (Platform.OS !== "web") {
      const response = await initDB()
    }
  } catch (error) {
    console.log(error);
  }
})()

export default function App() {
  return (
    <ToastProvider>
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <Navigator />
        </Provider>
      </SafeAreaView>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    // alignItems: "center",
    //backgroundColor: colors.teal200,
  },
});
