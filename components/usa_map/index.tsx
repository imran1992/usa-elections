import React, { useState, useEffect, Fragment } from "react";
import Svg, { G, Path } from "react-native-svg";
import data from "./USAMapDimensions";
import { StatesTypes } from "../../lib/InterFaces";
import { argonTheme } from "@constants";
import { Platform } from "react-native";
import { Picker, PickerIOS } from "@react-native-community/picker";
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
  title?: String;
  top?: number;
  stats?: Array<StatesTypes>;
  outerSetSelectedState: Function;
}) => {
  const [selectedState, setSelectedState] = useState<String>("");
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
              : yup
              ? "#444"
              : defaultFill
          }
          onPress={() => {
            clickHandler(abbreviation);
          }}
        />
      );
      paths.push(path);
    }
    return paths;
  };

  return (
    <Fragment>
      <Svg
        //style={{ backgroundColor: "#113335" }}
        width={width}
        height={height}
        viewBox="0 0 959 594"
      >
        <G>{buildPaths()}</G>
      </Svg>
      {Platform.OS === "android" ? (
        <Picker
          selectedValue={selectedState}
          onValueChange={setSelectedState}
          mode="dropdown"
        >
          {stats.map((item: StatesTypes, index: number) => (
            <Picker.Item
              key={item.STATE_ABBREVIATION}
              label={item.STATE_NAME}
              value={item.STATE_ABBREVIATION}
            />
          ))}
        </Picker>
      ) : (
        <PickerIOS
          selectedValue={selectedState}
          onValueChange={setSelectedState}
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
