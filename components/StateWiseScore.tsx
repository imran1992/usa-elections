import React from "react";
import { Image } from "react-native";
import { Block, Text } from "galio-framework";
import {
  widthPercentageToDP as W2DP,
  heightPercentageToDP as H2DP,
} from "react-native-responsive-screen";
import { argonTheme, Images } from "@constants";
import * as Animated from "react-native-animatable";
const TopBar = ({
  curentSelected = "ELECTORAL_COUNT_PREDICTED",
  currentObject = {},
}: {
  curentSelected: string;
  currentObject: object;
}) => {
  const predictedOne = curentSelected === 'ELECTORAL_COUNT_PREDICTED';
  return (
    <Block
      middle
      style={{
        backgroundColor: "#e1e3e6",
        marginHorizontal: W2DP(1.5),
        marginVertical: W2DP(2),
        borderRadius: W2DP(4),
      }}
      width={W2DP(95)}
    >
      <Block width={W2DP(90)} style={{ paddingVertical: H2DP(1) }}>
        <Block row style={{ alignItems: "center" }}>
          <AnimatedOrDull source={Images.Republican} animate={false} />
          <Block style={{ marginLeft: W2DP(2) }}>
            <Text small bold style={{ color: argonTheme.COLORS.redSide }}>
              {predictedOne
                ? currentObject.R_PERCENTAGE
                : currentObject.R_ORIGINAL_PERCENTAGE}
            </Text>
            <Text small style={{ color: argonTheme.COLORS.redSide }}>
              Republican
            </Text>
          </Block>
        </Block>
        <Block row style={{ alignItems: "center", marginTop: W2DP(4) }}>
          <AnimatedOrDull source={Images.Democratic} animate={false} />
          <Block style={{ marginLeft: W2DP(2) }}>
            <Text small bold style={{ color: argonTheme.COLORS.blueSide }}>
              {predictedOne
                ? currentObject.D_PERCENTAGE
                : currentObject.D_ORIGINAL_PERCENTAGE}
            </Text>
            <Text small style={{ color: argonTheme.COLORS.blueSide }}>
              Democratic
            </Text>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

const AnimatedOrDull = ({
  source,
  animate,
}: {
  animate: boolean;
  source: any;
}) => {
  return animate ? (
    <Animated.Image
      animation={"pulse"}
      easing={"ease-in-out-cubic"}
      iterationCount={"infinite"}
      style={{
        width: W2DP(8),
        height: W2DP(8),
        borderRadius: W2DP(4),
      }}
      width={W2DP(8)}
      height={W2DP(8)}
      source={source}
    />
  ) : (
    <Image
      style={{
        width: W2DP(8),
        height: W2DP(8),
        borderRadius: W2DP(4),
      }}
      width={W2DP(8)}
      height={W2DP(8)}
      source={source}
    />
  );
};
export default TopBar;
