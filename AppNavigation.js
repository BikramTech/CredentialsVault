import React, { useState } from 'react';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import { displayName as AppTitle } from './app.json';
import { ScreenNames, Colors } from './src/constants';
import { viewHeightPercent } from './src/shared';

import { Home, HeaderRightSection, HeaderSearchBox, AppSearch } from './src/components';


const AppNavigation = () => {

    const { Screen, Navigator } = createStackNavigator();


    return (
        <NavigationContainer>
            <Navigator initialRouteName={ScreenNames.home}>
            
                <Screen
                    name={ScreenNames.home}
                    component={Home.bind(this)}
                    options={{headerShown : false, headerStatusBarHeight: 0}}
                >
                </Screen>

                <Screen
                    name={ScreenNames.appSearch}
                    component={AppSearch.bind(this)}
                    options={{
                        headerShown: false
                    }}
                >
                </Screen>

            </Navigator>
        </NavigationContainer>
    )
}

export default React.memo(AppNavigation);