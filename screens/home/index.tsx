import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Block, Text } from "galio-framework";
import {
  widthPercentageToDP as W2DP,
  heightPercentageToDP as H2DP,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Bar } from "react-native-progress";
import { argonTheme } from "@constants";
import { USA_MAP } from "@components";
import { APIs } from "@lib";
import { StatesTypes } from "../../lib/interFaces";
const Home = ({ navigation }: { navigation: Object }) => {
  const { top } = useSafeAreaInsets();
  const [busy, setBusy] = useState(true);
  const [stats, setStats] = useState<StatesTypes[] | []>([]);
  const [thisManMarker, setThisManMarker] = useState({
    latitude: 0,
    longitude: 0,
  });

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
    APIs.fetchStats().then(({ data }: { data: Array<StatesTypes> }) => {
      if (Array.isArray(data)) {
        setStats(data);
        //console.log("data", data);
      }
    });
  }, []);

  return (
    <Block flex style={{ paddingTop: top }}>
      <Block row middle center>
        <Bar
          progress={0.7}
          width={W2DP(80)}
          color={argonTheme.COLORS.redSide}
          unfilledColor={argonTheme.COLORS.blueSide}
          borderWidth={0}
          useNativeDriver={true}
          animationType={"spring"}
        />
      </Block>
      <USA_MAP
        stats={stats}
        width={W2DP(100)}
        height={W2DP(68)}
        onPress={(State: string) => {
          console.log("State", State);
        }}
      />
      <Text style={{ fontFamily: "open-sans-regular" }}>ddd</Text>
    </Block>
  );
};

export default Home;
