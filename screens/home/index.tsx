import React, { Fragment, useEffect, useState } from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Block, Text, Button } from "galio-framework";
import {
  widthPercentageToDP as W2DP,
  heightPercentageToDP as H2DP,
} from "react-native-responsive-screen";
import { TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { argonTheme, Fonts, Images } from "@constants";
import { USA_MAP, TopBar, StateWise } from "@components";
import { APIs } from "@lib/index";
import { StatesTypes } from "@lib/interFaces";
import { MaterialIcons as ICON } from "@expo/vector-icons";
import AboutModal from "./aboutModal";
const Home = () => {
  const { top, bottom } = useSafeAreaInsets();
  const [busy, setBusy] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [stats, setStats] = useState<StatesTypes[] | []>([]);
  const [countryStats, setCountryStats] = useState<object>({});
  const [currentStats, seturrentStats] = useState("ELECTORAL_COUNT_PREDICTED");
  const [progress, setProgress] = useState(0);
  const [thisManMarker, setThisManMarker] = useState({
    latitude: 0,
    longitude: 0,
  });
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
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
      const { ALL_STATES_VOTES, COMBINED_RESULT } = data;
      if (Array.isArray(ALL_STATES_VOTES)) {
        setStats(ALL_STATES_VOTES);
        setCountryStats(COMBINED_RESULT);
        const {
          DEMOCRATIC,
          REPUBLICAN,
        } = COMBINED_RESULT.ELECTORAL_COUNT_PREDICTED;
        setProgress((DEMOCRATIC / (DEMOCRATIC + REPUBLICAN)) * 100);
        //console.log("data", ALL_STATES_VOTES[0]);
      }
    });
  }, []);

  return (
    <Fragment>
      <AboutModal isModalVisible={isModalVisible} toggleModal={toggleModal} />
      <Block
        flex
        style={{
          paddingTop: top,
          paddingBottom: bottom,
          paddingHorizontal: W2DP(1),
          position: "relative",
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <TopBar
            progress={progress}
            currentStats={currentStats}
            countryStats={countryStats}
          />
          <USA_MAP
            currentCheck={currentStats}
            setTagOfWarRop={setProgress}
            stats={stats}
            width={W2DP(98)}
            height={W2DP(66)}
            onPress={(State: string) => {
              console.log("State", State);
            }}
          />
        </ScrollView>
        <Block
          width={W2DP(98)}
          middle
          style={{
            justifyContent: "flex-end",
            paddingBottom: H2DP(1),
          }}
        >
          <Button
            size="large"
            color={argonTheme.COLORS.DEFAULT}
            onPress={() => {
              seturrentStats(
                currentStats === "ELECTORAL_COUNT_PREDICTED"
                  ? "ELECTORAL_COUNT_2016"
                  : "ELECTORAL_COUNT_PREDICTED"
              );
            }}
          >
            {currentStats === "ELECTORAL_COUNT_PREDICTED"
              ? "SWITCH TO 2016 STATS"
              : "SWITCH TO 2020 PREDICTED STATS"}
          </Button>
          <Button
            size="large"
            color={argonTheme.COLORS.MUTED}
            onPress={toggleModal}
          >
            HOW IT WORKS
          </Button>
        </Block>
      </Block>
    </Fragment>
  );
};

export default Home;
