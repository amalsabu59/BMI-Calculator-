import { StyleSheet, Text, View } from "react-native";
import BMI_Calculator from "./pages/BmiCalculator";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} />
      <BMI_Calculator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
