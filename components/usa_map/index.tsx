import React, { useState, useEffect } from "react";
import Svg, { G, Path } from "react-native-svg";
import data from "./USAMapDimensions";
import { StatesTypes } from "../../lib/InterFaces";
import { argonTheme } from "@constants";
const USAMap = ({
  onPress = () => {},
  defaultFill = "#D3D3D3",
  width = 959,
  height = 593,
  title = "Blank US states map",
  top = 0,
  customize = {},
  stats = [],
}: {
  onPress?: Function;
  customize?: Object;
  defaultFill?: string;
  width?: number;
  height?: number;
  title?: String;
  top?: number;
  stats?: Array<StatesTypes>;
}) => {
  const [selectedState, setSelectedState] = useState<String>("");
  const [modifiedStates, setModifiedStates] = useState<Object>(null);
  useEffect(() => {
    if (stats.length > 0) {
      let dataStates: Object = data();
      stats.forEach(
        (
          {
            STATE_ABBREVIATION,
            R_ORIGINAL_PERCENTAGE,
            P_ORIGINAL_PERCENTAGE,
            STATE_NAME,
          },
          index
        ) => {
          dataStates[STATE_ABBREVIATION].vote =
            parseInt(R_ORIGINAL_PERCENTAGE) > parseInt(P_ORIGINAL_PERCENTAGE)
              ? true
              : false;
        }
      );
      setModifiedStates(dataStates);
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
    <Svg
      style={{ backgroundColor: "#113335" }}
      width={width}
      height={height}
      viewBox="0 0 959 594"
    >
      <G>{buildPaths()}</G>
    </Svg>
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
