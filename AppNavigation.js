import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ScreenNames } from "./src/constants";
import { Home, AppSearch, Pin, SplashScreen } from "./src/components";

const AppNavigation = () => {
  const { Screen, Navigator } = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator initialRouteName={ScreenNames.splashScreen}>

      <Screen
      name={ScreenNames.splashScreen}
      component={SplashScreen.bind(this)}
      options={{ headerShown: false}}
      >
      </Screen>
       
        <Screen
          name={ScreenNames.pinScreen}
          component={Pin.bind(this)}
          options={{
            headerShown: false,
          }}
        ></Screen>

        <Screen
          name={ScreenNames.home}
          component={Home.bind(this)}
          options={{ headerShown: false }}
        ></Screen>

        <Screen
          name={ScreenNames.appSearch}
          component={AppSearch.bind(this)}
          options={{
            headerShown: false,
          }}
        ></Screen>
      </Navigator>
    </NavigationContainer>
  );
};

export default React.memo(AppNavigation);
