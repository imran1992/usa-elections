import React from "react";
import { Image } from "react-native";
import { Block, Text } from "galio-framework";
import {
  widthPercentageToDP as W2DP,
  heightPercentageToDP as H2DP,
} from "react-native-responsive-screen";
import { Bar } from "react-native-progress";
import { argonTheme, Images } from "@constants";
import * as Animated from "react-native-animatable";
const TopBar = ({ progress = 0 }: { progress?: number }) => {
  return (
    <Block middle>
      <Block
        row
        middle
        width={W2DP(90)}
        space="between"
        style={{ paddingVertical: H2DP(1) }}
      >
        <Block row>
          <AnimatedOrDull source={Images.Republican} animate={true} />
          <Block style={{marginLeft:W2DP(2)}}>
            <Text h6>206</Text>
            <Text small muted bold>
              Republican
            </Text>
          </Block>
        </Block>
        <Block row>
          <Block right={true} style={{marginRight:W2DP(2)}}>
            <Text h6>300</Text>
            <Text small muted bold>
              Democratic
            </Text>
          </Block>
          <AnimatedOrDull source={Images.Democratic} animate={true} />
        </Block>
      </Block>
      {progress ? (
        <Bar
          progress={progress}
          width={W2DP(90)}
          height={15}
          borderRadius={5}
          color={argonTheme.COLORS.redSide}
          unfilledColor={argonTheme.COLORS.blueSide}
          borderWidth={0}
          useNativeDriver={true}
          animationType={"spring"}
        />
      ) : (
        <Block
          width={W2DP(90)}
          height={10}
          style={{ backgroundColor: argonTheme.COLORS.MUTED, borderRadius: 5 }}
        />
      )}
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
        width: W2DP(11),
        height: W2DP(11),
        borderRadius: W2DP(5.5),
      }}
      width={W2DP(11)}
      height={W2DP(11)}
      source={source}
    />
  ) : (
    <Image
      style={{
        width: W2DP(11),
        height: W2DP(11),
        borderRadius: W2DP(5.5),
      }}
      width={W2DP(11)}
      height={W2DP(11)}
      source={source}
    />
  );
};
export default TopBar;
