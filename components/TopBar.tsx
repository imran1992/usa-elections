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
const ShouldAnimateDem = (STATE) => {
  if (STATE !== undefined) {
    const { DEMOCRATIC, REPUBLICAN } = STATE;
    return parseInt(DEMOCRATIC) >= parseInt(REPUBLICAN) ? true : false;
  }
  return false;
};
const ShouldAnimateRep = (STATE) => {
  if (STATE !== undefined) {
    const { DEMOCRATIC, REPUBLICAN } = STATE;
    return parseInt(DEMOCRATIC) <= parseInt(REPUBLICAN) ? true : false;
  }
  return false;
};
const TopBar = ({
  currentStats = "ELECTORAL_COUNT_PREDICTED",
  countryStats = {},
}: {
  currentStats?: string;
  countryStats?: object;
}) => {
  const prog = countryStats[currentStats]
    ? parseInt(countryStats[currentStats].REPUBLICAN) / 538
    : 0;

  console.log("prog", prog);
  return (
    <Block middle style={{ marginVertical: H2DP(2) }}>
      <Block
        row
        middle
        width={W2DP(90)}
        space="between"
        style={{ paddingVertical: H2DP(2) }}
      >
        <Block row>
          <AnimatedOrDull
            source={Images.Republican}
            animate={ShouldAnimateRep(countryStats[currentStats])}
          />
          <Block style={{ marginLeft: W2DP(2) }}>
            <Text h6>
              {countryStats[currentStats]
                ? countryStats[currentStats].REPUBLICAN
                : 0}
            </Text>
            <Text small muted bold>
              Republican
            </Text>
          </Block>
        </Block>
        <Block row>
          <Block right={true} style={{ marginRight: W2DP(2) }}>
            <Text h6>
              {countryStats[currentStats]
                ? countryStats[currentStats].DEMOCRATIC
                : 0}
            </Text>
            <Text small muted bold>
              Democrate
            </Text>
          </Block>
          <AnimatedOrDull
            source={Images.Democratic}
            animate={ShouldAnimateDem(countryStats[currentStats])}
          />
        </Block>
      </Block>
      {prog ? (
        <Bar
          progress={prog}
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
          height={15}
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
        width: W2DP(12),
        height: W2DP(12),
        borderRadius: W2DP(6),
      }}
      width={W2DP(12)}
      height={W2DP(12)}
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
