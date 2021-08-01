import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  useWindowDimensions,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";
import { FlatList } from "react-native-gesture-handler";

const cols = 5;

function HomeScreen({ navigation }) {
  const [colorArray, setColorArray] = useState([]);
  const blockSize = useWindowDimensions().width / cols;

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("DetailsScreen", {
            ...item,
          })
        }
      >
        <BlockRGB
          style={{ height: blockSize, width: blockSize }}
          red={item.red}
          green={item.green}
          blue={item.blue}
        />
      </TouchableOpacity>
    );
  }

  function addColor() {
    let newColor = {
      red: Math.floor(Math.random() * 256),
      green: Math.floor(Math.random() * 256),
      blue: Math.floor(Math.random() * 256),
      id: colorArray.length.toString(),
    };
    setColorArray([...colorArray, newColor]);
  }

  function resetColor() {
    setColorArray([]);
  }

  return (
    <View style={styles.container}>
      <Button onPress={addColor} title="Add Color" />
      <Button onPress={resetColor} title="Reset" />
      <FlatList
        style={{ width: "100%" }}
        data={colorArray}
        renderItem={renderItem}
        numColumns={cols}
      />
    </View>
  );
}

function DetailsScreen({ route }) {
  const { red, green, blue } = route.params;

  const textRed = red > 125 ? 255 - red - 20 : 255 + red + 20;
  const textGreen = green > 125 ? 255 - green - 20 : 255 + green + 20;
  const textBlue = blue > 125 ? 255 - blue - 20 : 255 + blue + 20;

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: "center",
          backgroundColor: `rgb(${red}, ${green}, ${blue})`,
        },
      ]}
    >
      <Text
        style={[
          { color: `rgb(${textRed}, ${textGreen}, ${textBlue})` },
          styles.detailsText,
        ]}
      >
        Red: {red}
      </Text>
      <Text
        style={[
          { color: `rgb(${textRed}, ${textGreen}, ${textBlue})` },
          styles.detailsText,
        ]}
      >
        Green: {green}
      </Text>
      <Text
        style={[
          { color: `rgb(${textRed}, ${textGreen}, ${textBlue})` },
          styles.detailsText,
        ]}
      >
        Blue: {blue}
      </Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Colours" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  detailsText: {
    fontSize: 36,
    marginBottom: 12,
  },
});
