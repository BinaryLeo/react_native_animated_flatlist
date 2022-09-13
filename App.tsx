import * as React from "react";
import {
  Image,
  Text,
  View,
  StatusBar,
  StyleSheet,
  Animated,
} from "react-native";
import { faker } from "@faker-js/faker";
faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.datatype.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.arrayElement([
      "women",
      "men",
    ])}/${faker.random.numeric()}.jpg`,
    name: faker.name.firstName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const spacing = 20;
const avatarSize = 70;
const itemSize = avatarSize + spacing * 3;
const bgImg =
  "https://images.unsplash.com/photo-1647323968696-0ea09525407c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=363&q=80";

export function App() {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={{ flex: 1, backgroundColor: "#cec6c6" }}>
      <Image source={{ uri: bgImg }} style={StyleSheet.absoluteFill} />
      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{
          padding: spacing,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({ item, index }) => {
          const inputRange = [-1, 0, itemSize * index, itemSize * (index + 2)];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: inputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={{
                width: "100%",
                height: 120,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: spacing,
                marginBottom: spacing,
                backgroundColor: "rgba(125,75,62, 0.3)",
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 3,
                shadowRadius: 20,
                opacity,
                transform: [{ scale }],
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: avatarSize,
                  height: avatarSize,
                  borderRadius: avatarSize,
                  marginRight: spacing / 2,
                }}
              />
              <View style={{ alignItems: "center", padding: 10 }}>
                <Text
                  style={{ fontSize: 22, fontWeight: "700", color: "#fff" }}
                >
                  {item.name}
                </Text>
                <Text style={{ fontSize: 18, opacity: 0.7, color: "#fff" }}>
                  {item.jobTitle}
                </Text>
                <Text style={{ fontSize: 12, opacity: 0.8, color: "#fff" }}>
                  {item.email}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}
