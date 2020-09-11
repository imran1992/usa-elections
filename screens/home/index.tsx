import React from "react";
import { StyleSheet } from "react-native";
import { Block } from "galio-framework";
import MapView from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const Home = ({ navigation }: { navigation: Object }) => {
  const { top } = useSafeAreaInsets();
  return <MapView style={{ paddingTop: top, flex: 1 }} />;
};
const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
});
export default Home;
