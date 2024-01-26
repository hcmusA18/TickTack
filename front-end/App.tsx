import App from "./src/app";
import React from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync()
const TickTackApp = () => {
  return <App hideSplashScreen={SplashScreen.hideAsync} />;
}

export default TickTackApp;