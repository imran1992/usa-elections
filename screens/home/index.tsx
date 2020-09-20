import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Block, Text, Button } from "galio-framework";
import {
  widthPercentageToDP as W2DP,
  heightPercentageToDP as H2DP,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { argonTheme, Fonts, Images } from "@constants";
import { USA_MAP, TopBar, StateWise } from "@components";
import { APIs } from "@lib/index";
import { StatesTypes } from "@lib/interFaces";

const Home = ({ navigation }: { navigation: Object }) => {
  const { top } = useSafeAreaInsets();
  const [busy, setBusy] = useState(true);
  const [stats, setStats] = useState<StatesTypes[] | []>([]);
  const [progress, setProgress] = useState(0);
  const [thisManMarker, setThisManMarker] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    // (async () => {
    //   try {
    //     // get exisiting locaton permissions first
    //     const { status: existingStatus } = await Permissions.getAsync(
    //       Permissions.LOCATION
    //     );
    //     let finalStatus = existingStatus;
    //     // ask again to grant locaton permissions (if not already allowed)
    //     if (existingStatus !== "granted") {
    //       const { status } = await Permissions.askAsync(Permissions.LOCATION);
    //       finalStatus = status;
    //     }
    //     // still not allowed to use location?
    //     if (finalStatus !== "granted") {
    //       setBusy(false);
    //       return;
    //     }
    //     await Location.getCurrentPositionAsync().then(
    //       async ({ coords: { latitude, longitude } }) => {
    //         setThisManMarker({ latitude, longitude });
    //       }
    //     );
    //   } catch (e) {
    //     console.log("ERROR", JSON.stringify(e));
    //   }
    // })();
    APIs.fetchStats().then(({ data }: { data: Array<StatesTypes> }) => {
      if (Array.isArray(data)) {
        setStats(data);
        console.log("data", data);
      }
    });
  }, []);

  return (
    <Block flex style={{ paddingTop: top, paddingHorizontal: W2DP(1) }}>
      <TopBar progress={progress} />
      <StateWise />
      <USA_MAP
        setTagOfWarRop={setProgress}
        stats={stats}
        width={W2DP(98)}
        height={W2DP(66)}
        onPress={(State: string) => {
          console.log("State", State);
        }}
      />
      <Block middle>
        <Button round size="small" color={argonTheme.COLORS.MUTED}>2016</Button>
      </Block>
    </Block>
  );
};

export default Home;
