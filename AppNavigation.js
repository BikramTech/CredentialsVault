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
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const toggleBottomSheet = () => {
        setIsBottomSheetOpen(!isBottomSheetOpen);
    };

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
        header: isSearchBoxOpen? () =>  <HeaderSearchBox searchBoxTextValue={searchBoxTextValue} onClearSearchBox={() => clearSearchBox()} onToggleSearch={() => toggleSearch()} onSearchBoxTextChange={(value) => onSearchBoxTextChange(value)} /> : React.ReactNode,
        headerTitleAlign: "left",
        headerStyle: { backgroundColor: Colors.primary },
        headerRight: !isBottomSheetOpen? () => <HeaderRightSection  onToggleSearch={() => toggleSearch()} onToggleBottomSheet={() => toggleBottomSheet()} /> : React.ReactNode,
        headerTintColor: Colors.white,
        headerStatusBarHeight: viewHeightPercent(5),
        headerTitleStyle: { fontSize: viewHeightPercent(2.1), fontFamily: 'HelveticaNeue-Medium'  }
    };

    return (
        <NavigationContainer>
            <Navigator initialRouteName={ScreenNames.home}>
                <Screen
                    name={ScreenNames.home}
                    component={Home.bind(this,{isBottomSheetOpen, onToggleBottomSheet: toggleBottomSheet})}
                    options={headerOptions}
                >
                </Screen>
            </Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;