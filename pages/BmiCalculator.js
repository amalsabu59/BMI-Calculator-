import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const BMI_Calculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [toReduce, setToReduce] = useState("");
  const [toAdd, setToAdd] = useState("");

  const validate = () => {
    if (!weight || !height) {
      setError("Please enter a weight and height.");
      return false;
    }
    if (isNaN(weight) || isNaN(height)) {
      setError("Weight and height must be numbers.");
      return false;
    }
    setError("");
    return true;
  };

  const resetAll = () => {
    setToAdd("");
    setToReduce("");
    setMessage("");
    setBmi("");
  };
  const calculateBmi = () => {
    resetAll("");
    if (validate()) {
      let bmiValue = weight / ((height / 100) * (height / 100));
      setBmi(bmiValue.toFixed(2));
      if (bmiValue < 18.5) {
        setMessage("You are underweight!");
        let toAddValue = 18.5 * (height / 100) * (height / 100) - weight;
        setToAdd(toAddValue.toFixed(2));
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        setMessage("You are normal weight!");
      } else {
        setMessage("You are overweight!");
        let toReduceValue = 24.9 * (height / 100) * (height / 100) - weight;
        setToReduce(toReduceValue.toFixed(2));
      }
    }
  };

  return (
    <ImageBackground source={require("../assets/bmi3.png")} style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>BMI Calculator</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          keyboardType="numeric"
          onChangeText={(text) => setWeight(text)}
          value={weight}
        />
        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          keyboardType="numeric"
          onChangeText={(text) => setHeight(text)}
          value={height}
        />
        <TouchableOpacity style={styles.button} onPress={calculateBmi}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {bmi ? (
          <View style={styles.textContainer}>
            <Text>Your BMI is: {bmi}</Text>
          </View>
        ) : null}
        {message ? (
          <Text
            style={toReduce || toAdd ? styles.messageIfNotNrml : styles.message}
          >
            {message}
          </Text>
        ) : null}
        {toAdd ? (
          <Text style={styles.toReduce}>
            You need to add {toAdd} kg to be normal
          </Text>
        ) : toReduce ? (
          <Text style={styles.toReduce}>
            You need to reduce {toReduce} kg to be normal
          </Text>
        ) : null}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 10,
    width: "80%",
    borderRadius: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  error: {
    color: "red",
    margin: 10,
    fontWeight: "bold",
  },
  message: {
    color: "green",
    margin: 10,
    fontWeight: "bold",
  },
  messageIfNotNrml: {
    color: "red",
    margin: 10,
    fontWeight: "bold",
  },
  textContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    margin: 10,
    width: "80%",
  },
  toReduce: {
    color: "green",
    margin: 10,
    fontWeight: "bold",
  },
  headingContainer: {
    backgroundColor: "rgba(205, 205, 205, 0.5)",
    padding: 10,
    borderRadius: 30,
    alignSelf: "center",
    margin: 10,
    width: "80%",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
  },
});

export default BMI_Calculator;
