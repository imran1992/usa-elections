/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Fragment } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { argonTheme } from "@constants";

//import { useSelector } from "react-redux";
//==================================================================
import TabbedHome from "@screens/home/index.tsx";

const { Navigator, Screen } = createBottomTabNavigator();
const IconMutiplyer = 1.3;
export default () => {
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: argonTheme.COLORS.ERROR,
        inactiveTintColor: argonTheme.COLORS.MUTED,
        tabStyle: { justifyContent: "center", alignItems: "center" },
        showLabel: false,
      }}
    >
      <Screen
        name="tabbedHome"
        component={TabbedHome}
        options={{
          //tabBarLabel: () => null,
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name={`home`} size={size * IconMutiplyer} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};
