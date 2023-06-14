import { StyleSheet, View } from "react-native";
import Routes from "./Routes";

export default function App() {
  return (
    <View style={styles.container}>
      <Routes />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: "10%", backgroundColor: "black", flex: 1 },
});
