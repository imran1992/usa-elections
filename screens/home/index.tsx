import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Block } from "galio-framework";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const Home = ({ navigation }: { navigation: Object }) => {
  const [busy, setBusy] = useState(true);
  const [thisManMarker, setThisManMarker] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [selectedMarker, setSelectedMarker] = useState({
    latitude: 0,
    longitude: 0,
  });
  const { top } = useSafeAreaInsets();
  useEffect(() => {
    (async () => {
      try {
        // get exisiting locaton permissions first
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.LOCATION
        );
        let finalStatus = existingStatus;
        // ask again to grant locaton permissions (if not already allowed)
        if (existingStatus !== "granted") {
          const { status } = await Permissions.askAsync(Permissions.LOCATION);
          finalStatus = status;
        }
        // still not allowed to use location?
        if (finalStatus !== "granted") {
          setBusy(false);
          return;
        }
        await Location.getCurrentPositionAsync().then(
          async ({ coords: { latitude, longitude } }) => {
            setThisManMarker({ latitude, longitude });
          }
        );
      } catch (e) {
        console.log("ERROR", JSON.stringify(e));
      }
    })();
  }, []);
  return (
    <Block flex style={{ paddingTop: top,backgroundColor:'#fff' }}>
      <MapView
        region={{
          ...thisManMarker,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        style={{ flex: 1 }}
        //showsUserLocation
        provider={PROVIDER_GOOGLE}
      />
    </Block>
  );
};
const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
});
export default Home;
