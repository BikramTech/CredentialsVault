import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Colors, ScreenNames } from '../constants'
import { viewHeightPercent, viewWidthPercent } from '../shared/Utils';
import { WebsitesDataDbService } from '../services';
import { TouchableOpacity } from 'react-native-gesture-handler';

import HeaderSearchBox from './HeaderSearchBox';


const AppSearch = (props) => {

    const navigation = useNavigation();
    const [websites, setWebsites] = useState([]);
    const [pageOffset, setPageOffset] = useState(0);

    const [searchBoxTextValue, setSearchBoxTextValue] = useState("");

    useEffect(() => {
        getWebsites(pageOffset);

        return () => {
            setPageOffset(0);
            console.log("unmounted!") // This worked for me
        };
    }, []);


    const getWebsites = (pageOffset) => {

        WebsitesDataDbService.GetWebsitesData(pageOffset).then(websites => {
            console.log("App Search mounted!")
            setWebsites((prevData) => [...prevData, ...websites])
        });
    }

    const loadMoreWebsites = () => {
        const increasedOffset = pageOffset + 19;
        setPageOffset(increasedOffset);
        getWebsites(increasedOffset);
    }

    const clearSearchBox = () => {
        setSearchBoxTextValue("");
        searchWebsites("");
    };

    const toggleAppSearch = () => {
        navigation.navigate(ScreenNames.home);
    }

    const onSearchBoxTextChange = (searchText) => {
        setSearchBoxTextValue(searchText);
        searchWebsites(searchText);
    };

    const selectApp = ({ website }) => {
        let homeRoute = navigation.dangerouslyGetState().routes.find(route => route.name === ScreenNames.home);
        homeRoute.params = website;
        toggleAppSearch();
    }

    const searchWebsites = (searchText) => {
        websites;
        WebsitesDataDbService.SearchWebsites(searchText).then(websites => {
            setWebsites(websites);
        });
    }

    const WebsiteLogo = (Logo) => <Image source={{ uri: Logo }} style={styles.appLogo} resizeMode='contain'></Image>

    const WebsitesListItem = ({ website }) => <TouchableOpacity onPress={selectApp.bind(this, { website })} style={styles.appDetailsWrapper}>
        {WebsiteLogo(website.Logo)}
        <View style={styles.appNameWrapper}>
            <Text >{website.DisplayName}</Text>
        </View></TouchableOpacity>


    return <>
        <HeaderSearchBox searchBoxTextValue={searchBoxTextValue} onClearSearchBox={clearSearchBox} onToggleSearch={toggleAppSearch} onSearchBoxTextChange={onSearchBoxTextChange} />
        <FlatList
            style={styles.appSearchContainer}
            data={websites}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => <WebsitesListItem website={item}></WebsitesListItem>}
            scrollIndicatorInsets={{ right: 1 }}
            onEndReached={loadMoreWebsites}
            onEndReachedThreshold={0}
        />
    </>

}

const styles = StyleSheet.create({
    appSearchContainer: {
        flex: 1,
        padding: viewWidthPercent(5),
        backgroundColor: Colors.white
    },

    appLogo: {
        height: viewHeightPercent(5),
        width: viewHeightPercent(5),
        borderRadius: (viewHeightPercent(5) / 2)
    },

    appDetailsWrapper: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: '2%',
        alignItems: 'center'
    },

    appNameWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.silver,
        paddingVertical: '6%',
        width: '85%',
        marginHorizontal: '2.5%'
    }
})

export default AppSearch;