import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import Navigator from "./tabNav";
//import { Store, persistor } from "../redux/store";
enableScreens();
export default () => (
  <NavigationContainer>
    {/* <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}> */}
    <Navigator />
    {/* </PersistGate>
    </Provider> */}
  </NavigationContainer>
);
