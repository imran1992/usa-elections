import React, { useEffect, useState } from "react";
import { Block, Text } from "galio-framework";
import {
  widthPercentageToDP as W2DP,
  heightPercentageToDP as H2DP,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { argonTheme, Fonts, Images } from "@constants";

const About = ({ navigation }: { navigation: Object }) => {
  const { top } = useSafeAreaInsets();
  return (
    <Block flex style={{ paddingTop: top, paddingHorizontal: W2DP(1) }}></Block>
  );
};

export default About;
