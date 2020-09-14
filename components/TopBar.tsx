import React from "react";
import { Image } from "react-native";
import { Block } from "galio-framework";
import {
  widthPercentageToDP as W2DP,
  heightPercentageToDP as H2DP,
} from "react-native-responsive-screen";
import { Bar } from "react-native-progress";
import { argonTheme, Images } from "@constants";

const TopBar = ({ progress = 0 }: { progress?: number }) => {
  return (
    <Block row middle space="between" style={{ paddingVertical: H2DP(1) }}>
      <Image
        style={{ width: W2DP(11), height: W2DP(11) }}
        width={W2DP(11)}
        height={W2DP(11)}
        source={Images.Republican}
      />
      <Bar
        progress={progress}
        width={W2DP(70)}
        height={8}
        color={argonTheme.COLORS.redSide}
        unfilledColor={argonTheme.COLORS.blueSide}
        borderWidth={0}
        useNativeDriver={true}
        animationType={"spring"}
      />
      <Image
        style={{ width: W2DP(11), height: W2DP(11) }}
        width={W2DP(11)}
        height={W2DP(11)}
        source={Images.Democratic}
      />
    </Block>
  );
};

export default TopBar;
