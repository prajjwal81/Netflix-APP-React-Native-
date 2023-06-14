import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const [seasonName, setSeasonName] = useState("");
  const [numberOfSeason, setNumberOfSeason] = useState("");

  const submitHandler = () => {
    if (seasonName.length == 0 || numberOfSeason.length == 0) {
      alert("please enter both the field");
      return;
    }
    const data = {
      id: uuid.v4(),
      seasonName,
      numberOfSeason,
    };

    const retriveData = async () => {
      const newData = [];
      newData.push(data);
      try {
        const currentValue = await AsyncStorage.getItem("@seasons");
        const parsedCurrentValue = JSON.parse(currentValue);
        if (!currentValue) {
          await AsyncStorage.setItem("@seasons", JSON.stringify(newData));
          // AsyncStorage.clear();
        } else {
          parsedCurrentValue.push(data);
          await AsyncStorage.setItem(
            "@seasons",
            JSON.stringify(parsedCurrentValue)
          );
          // AsyncStorage.clear();

          navigation.navigate("Show");
        }
      } catch (e) {
        console.log(e);
      }
    };
    retriveData();
    setSeasonName("");
    setNumberOfSeason("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.text}>Netflix App</Text>
      </View>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder={"Enter Your SEASON NAME"}
          placeholderTextColor={"#fff"}
          value={seasonName}
          onChangeText={(text) => {
            setSeasonName(text);
          }}
        />
      </View>
      <View>
        <TextInput
          keyboardType="numeric"
          style={styles.textInput2}
          placeholder={"NO. OF SEASON"}
          placeholderTextColor={"#fff"}
          value={numberOfSeason}
          onChangeText={(text) => {
            setNumberOfSeason(text);
          }}
        />
      </View>
      <Pressable
        onPress={() => {
          submitHandler();
        }}
      >
        <View style={styles.btn}>
          <Text style={styles.btnText}>Submit</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  container2: {
    height: "10%",
    // borderWidth: 3,
    // backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    fontSize: 40,
    color: "white",
    fontWeight: "600",
    letterSpacing: 3,
  },
  textInput: {
    fontSize: 10,
    color: "white",
    fontWeight: "600",
    letterSpacing: 3,
    backgroundColor: "#1E1E1E",
    height: "30%",
    paddingLeft: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "red",
    marginTop: "10%",
  },
  textInput2: {
    fontSize: 10,
    color: "white",
    fontWeight: "600",
    letterSpacing: 3,
    backgroundColor: "#1E1E1E",
    height: "40%",
    paddingLeft: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "red",
    marginTop: "-30%",
  },
  btn: {
    backgroundColor: "#1E1E1E",
    width: "90%",
    height: 60,
    justifyContent: "center",
    borderRadius: 20,
    marginTop: "-50%",
    marginLeft: "5%",
  },
  btnText: {
    fontSize: 15,
    fontWeight: "700",
    color: "white",
    fontWeight: "600",
    letterSpacing: 3,
    textAlign: "center",
  },
});
