import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const Add = () => {
  const [name, setName] = useState("");
  const [numOfSea, setNumOfSea] = useState("");
  const route = useRoute();
  userid = route?.params?.id;

  const navigation = useNavigation();


  useEffect(() => {
    const fetchedData = async () => {
      const jsonValue = await AsyncStorage.getItem("@seasons");
      parsedJsonValue = JSON.parse(jsonValue);

      const namee = parsedJsonValue.filter((item) => {
        return item.id == userid.id;
      });
      setName(namee[0].seasonName);
      setNumOfSea(namee[0].numberOfSeason);
    };
    fetchedData();
  }, []);

  const editHandler = async () => {
    const jsonData = await AsyncStorage.getItem("@seasons");
    const parsedJsonData = JSON.parse(jsonData);
    newData = parsedJsonData.map((item) => {
      if (name == item.seasonName && numOfSea == item.numberOfSeason) {
        alert("please change the value first");
      } else {
        if (item.id == userid.id) {
          item.seasonName = name;
          item.numberOfSeason = numOfSea;
        }
      }
      return item;
    });
    await AsyncStorage.setItem("@seasons", JSON.stringify(newData));
    navigation.navigate("Show");
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
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
        />
      </View>
      <View>
        <TextInput
          keyboardType="numeric"
          style={styles.textInput2}
          placeholder={"NO. OF SEASON"}
          placeholderTextColor={"#fff"}
          value={numOfSea}
          onChangeText={(text) => {
            setNumOfSea(text);
          }}
        />
      </View>
      <Pressable
        onPress={() => {
          editHandler();
        }}
      >
        <View style={styles.btn}>
          <Text style={styles.btnText}>Edit</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Add;

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
