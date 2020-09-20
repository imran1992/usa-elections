import "react-native-gesture-handler";
import React, { useState,useEffect } from "react";
import { StyleSheet, Image,StatusBar } from "react-native";
import { Block, GalioProvider } from "galio-framework";
import { AppLoading } from "expo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Images, argonTheme } from "@constants";
import AppContainer from "./navigator";
const assetImages = [Images.Logo, Images.Democratic, Images.Republican];
const cacheImages = (images: Array<any>) => {
  return images.map((image: any) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

const App = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const _loadResourcesAsync = async () => {
    return Promise.all([...cacheImages(assetImages)]);
  };
useEffect(()=>{StatusBar.setBarStyle('dark-content')},[])
  const _handleLoadingError = (error: any) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry test
    console.warn(error);
  };

  const _handleFinishLoading = () => {
    Font.loadAsync({
      "open-sans-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
      "open-sans-light": require("./assets/fonts/OpenSans-Light.ttf"),
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    }).then(() => {
      setIsLoadingComplete(true);
    });
  };
  return isLoadingComplete === true ? (
    <GalioProvider theme={argonTheme}>
      <SafeAreaProvider>
        <Block flex style={styles.container}>
          <AppContainer />
        </Block>
      </SafeAreaProvider>
    </GalioProvider>
  ) : (
    <AppLoading
      startAsync={_loadResourcesAsync}
      onError={_handleLoadingError}
      onFinish={_handleFinishLoading}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
export default App;
