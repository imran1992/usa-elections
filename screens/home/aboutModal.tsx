import React, { useEffect } from "react";
import { Block, Text } from "galio-framework";
import { setStatusBarStyle } from "expo-status-bar";
import {
  widthPercentageToDP as W2DP,
  heightPercentageToDP as H2DP,
} from "react-native-responsive-screen";
import { TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { argonTheme, Fonts, Images } from "@constants";
import Modal from "react-native-modal";
import { MaterialCommunityIcons as ICON2 } from "@expo/vector-icons";
const AboutModal = ({
  isModalVisible,
  toggleModal,
}: {
  toggleModal: Function;
  isModalVisible: Boolean;
}) => {
  useEffect(() => {
    isModalVisible ? setStatusBarStyle("light") : setStatusBarStyle("dark");
  }, [isModalVisible]);
  return (
    <Modal coverScreen={true} isVisible={isModalVisible} useNativeDriver={true}>
      <Block
        card
        width={W2DP(95)}
        flex
        center
        middle
        style={{ backgroundColor: "#fff", paddingBottom: 10 }}
      >
        <Block
          center
          middle
          style={{
            borderBottomColor: argonTheme.COLORS.MUTED,
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: "100%",
            paddingVertical: W2DP(1),
          }}
        >
          <Text h4 bold>
            How It Works
          </Text>
        </Block>
        <ScrollView style={{ flex: 1, paddingHorizontal: W2DP(3) }}>
          <Block style={{ paddingTop: W2DP(4) }}>
            <Text p style={{ marginBottom: 12 }}>
              The best way to predict the future is to study past behavior. This
              is the underlying idea behind Big Data Analytics. The Obama
              election campaign of 2008 was one of the first to take advantage
              of data-driven methods in the race to an elected office. The Obama
              campaign had a data analytics team of 100 people. This shows how
              deeply data analytics impacts the world. From recommending
              products to customers on e-commerce websites (i.e. using
              predictive analytics) to electing the most powerful official of
              the free world. Big Data Analytics is indeed everywhere. Data
              analytics has evolved itself to become the brain of every election
              campaign since the Obama campaign. Data analytics helps the
              election campaign to understand the voters better and hence adapt
              to their sentiments.
            </Text>
            <Text p style={{ marginBottom: 12 }}>
              There are two subdivisions of extracting data for an election
              campaign. Firstly, social data and polling data and secondly
              public data which becomes a part of Big Data.
            </Text>
            <Text p style={{ marginBottom: 12 }}>
              As we all have access to previous elections data, we can make use
              of it to find patterns and thus make strong predictions.
            </Text>
            <Text p>
              Our team is consistently analysing latest trends in social media
              such as facebook and twitter. Our automated system performs
              sentiment analysis on many of authentic news sources and assigns
              calculated score to each of election party.
            </Text>
          </Block>
        </ScrollView>
        <Block>
          <TouchableOpacity
            onPress={toggleModal}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: argonTheme.COLORS.MUTED,
              width: W2DP(12),
              height: W2DP(12),
              borderRadius: W2DP(6),
              elevation: 5,
            }}
          >
            <ICON2 name="chevron-down" color="#fff" size={W2DP(11)} />
          </TouchableOpacity>
        </Block>
      </Block>
    </Modal>
  );
};

export default AboutModal;
