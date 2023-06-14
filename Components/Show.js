import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

const Show = () => {
  const navigation = useNavigation();
  const [data, setdata] = useState([]);
  const [show, setShow] = useState(false);
  const isFocused = useIsFocused();

  const deleteHandler = async (id) => {
    const filteredData = data.filter((item) => item.id != id);
    setdata(filteredData);
    await AsyncStorage.setItem("@seasons", JSON.stringify(filteredData));
  };
  const editHandler = (id) => {
    navigation.navigate("Add", { id: { id } });
  };

  useEffect(() => {
    if (isFocused) {
      setShow((prev) => !prev);
    }
  }, [isFocused]);

  useEffect(() => {
    const fetchedData = async () => {
      const response = await AsyncStorage.getItem("@seasons");
      parsedResponse = JSON.parse(response);
      setdata(parsedResponse);
    };
    fetchedData();
  }, [show]);
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.text}>Netflix App</Text>
      </View>

      <ScrollView>
        {data?.map((item, idx) => {
          return (
            <>
              {item.seasonName.length === 0 ? (
                <Text style={{ fontSize: 18, color: "white", flex: 1 }}>
                  Nothing to show
                </Text>
              ) : (
                <View style={styles.textbox} key={item.id}>
                  <View
                    style={{
                      width: "70%",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={styles.textInput}>
                      SEASON NAME: {item.seasonName}
                    </Text>
                    <Text style={styles.textInput}>
                      NO. OF SEASON: {item.numberOfSeason}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "30%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        editHandler(item.id);
                      }}
                    >
                      <Icon
                        name="edit"
                        size={23}
                        color={"white"}
                        style={{ marginRight: 19 }}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        deleteHandler(item.id);
                      }}
                    >
                      <Icon name="delete" size={23} color={"white"} />
                    </Pressable>
                  </View>
                </View>
              )}
            </>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Show;

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
  textbox: {
    height: "90%",
    backgroundColor: "#1E1E1E",
    // borderColor: "red",
    borderWidth: 1,
    marginTop: "10%",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  textInput: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
    letterSpacing: 3,
    textAlign: "left",
  },
});
