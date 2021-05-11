import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import { displayName as AppTitle } from './app.json';
import { ScreenNames, Colors } from './src/constants';
import { viewHeightPercent } from './src/shared';

import { Home, HeaderRightSection, HeaderSearchBox } from './src/components';


const AppNavigation = () => {

    const { Screen, Navigator } = createStackNavigator();

    const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
    const [searchBoxTextValue, setSearchBoxTextValue] = useState("");

    const toggleSearch = () => {
        const isOpen = !isSearchBoxOpen;
        setIsSearchBoxOpen(isOpen);
        clearSearchBox()
    };

    const onSearchBoxTextChange = (searchText) => {
        setSearchBoxTextValue(searchText);
    };

    const clearSearchBox = () => {
        setSearchBoxTextValue("");
    };

    const headerOptions = {
        title: AppTitle,
        header: isSearchBoxOpen ? () =>  <HeaderSearchBox searchBoxTextValue={searchBoxTextValue} onClearSearchBox={() => clearSearchBox()} onToggleSearch={() => toggleSearch()} onSearchBoxTextChange={(value) => onSearchBoxTextChange(value)} /> : React.ReactNode,
        headerTitleAlign: "left",
        headerStyle: { backgroundColor: Colors.black },
        headerRight: () => <HeaderRightSection onToggleSearch={() => toggleSearch()} />,
        headerTintColor: Colors.white,
        headerStatusBarHeight: viewHeightPercent(8),
        headerTitleStyle: { fontSize: viewHeightPercent(2.1), fontFamily: 'HelveticaNeue-Medium'  }
    };

    return (
        <NavigationContainer>
            <Navigator initialRouteName={ScreenNames.home}>
                <Screen
                    name={ScreenNames.home}
                    component={Home}
                    options={headerOptions}
                >
                </Screen>
            </Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;