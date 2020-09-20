import React, { useState, useEffect, Fragment } from "react";
import { Block } from "galio-framework";
import Svg, { G, Path } from "react-native-svg";
import data from "./USAMapDimensions";
import { StatesTypes } from "../../lib/InterFaces";
import { argonTheme } from "@constants";
import { Platform } from "react-native";
import { Picker, PickerIOS } from "@react-native-community/picker";
import { widthPercentageToDP as W2DP } from "react-native-responsive-screen";
const USAMap = ({
  setTagOfWarRop = () => {},
  onPress = () => {},
  defaultFill = "#D3D3D3",
  width = 959,
  height = 593,
  title = "",
  top = 0,
  customize = {},
  stats = [],
  outerSetSelectedState = () => {},
}: {
  onPress?: Function;
  setTagOfWarRop?: Function;
  customize?: Object;
  defaultFill?: string;
  width?: number;
  height?: number;
  title?: string;
  top?: number;
  stats?: Array<StatesTypes>;
  outerSetSelectedState: Function;
}) => {
  const [selectedState, setSelectedState] = useState<string>("AL");
  const [modifiedStates, setModifiedStates] = useState<Object>(null);
  useEffect(() => {
    if (stats.length > 0) {
      let count = 0;
      let dataStates: Object = data();
      stats.forEach(
        (
          {
            STATE_ABBREVIATION,
            R_PERCENTAGE,
            ELECTORAL_COLLEGE,
            D_PERCENTAGE,
            STATE_NAME,
          },
          index
        ) => {
          const isIt = parseInt(R_PERCENTAGE) > parseInt(D_PERCENTAGE);
          dataStates[STATE_ABBREVIATION].vote = isIt ? true : false;
          isIt === true && count++;
        }
      );
      setModifiedStates(dataStates);
      setTagOfWarRop(count / stats.length);
    }
  }, [stats]);

  const clickHandler = (abbreviation: String) => {
    setSelectedState(abbreviation);
    onPress(abbreviation);
  };

  const buildPaths = () => {
    const paths = [];
    let dataStates: Object = modifiedStates ? modifiedStates : data();
    for (let stateKey in dataStates) {
      const { name, dimensions, abbreviation, vote } = dataStates[stateKey];
      const yup = selectedState === abbreviation;
      const path = (
        <USAState
          key={stateKey}
          stateName={name}
          dimensions={dimensions}
          fill={
            vote !== undefined
              ? vote
                ? yup
                  ? argonTheme.COLORS.redSideP
                  : argonTheme.COLORS.redSide
                : yup
                ? argonTheme.COLORS.blueSideP
                : argonTheme.COLORS.blueSide
              : defaultFill
          }
          onPress={() => {
            clickHandler(abbreviation);
          }}
        />
      );
      paths.push(path);
    }
    return <G>{paths}</G>;
  };

  return (
    <Fragment>
      <Svg
        //style={{ backgroundColor: "#113335" }}
        width={width}
        height={height}
        viewBox="0 0 959 594"
      >
        {buildPaths()}
      </Svg>
      <Block middle>
        {Platform.OS === "android" ? (
          <Block
            height={40}
            width={W2DP(90)}
            style={{ backgroundColor: "#8898AA", borderRadius: 20 }}
          >
            <Picker
              selectedValue={selectedState}
              onValueChange={setSelectedState}
              mode="dialog"
              style={{ height: 40, width: W2DP(90), color: "#fff" }}
              prompt={"Pick State"}
            >
              {stats.map((item: StatesTypes, index: number) => (
                <Picker.Item
                  key={item.STATE_ABBREVIATION}
                  label={item.STATE_NAME}
                  value={item.STATE_ABBREVIATION}
                />
              ))}
            </Picker>
          </Block>
        ) : (
          <PickerIOS
            selectedValue={selectedState}
            onValueChange={setSelectedState}
            style={{ width: W2DP(90) }}
          >
            {stats.map((item: StatesTypes, index: number) => (
              <PickerIOS.Item
                key={item.STATE_ABBREVIATION}
                label={item.STATE_NAME}
                value={item.STATE_ABBREVIATION}
              />
            ))}
          </PickerIOS>
        )}
      </Block>
    </Fragment>
  );
};

const USAState = ({
  dimensions,
  fill,
  onPress,
  stateName,
  state,
}: {
  stateName: string;
  dimensions: string;
  fill: string;
  onPress: Function;
}) => {
  return <Path d={dimensions} fill={fill} onPress={onPress} />;
};
export default USAMap;
