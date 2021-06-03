import React, { useRef } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import { Search, Plus } from 'react-native-iconly';

const HeaderRightSection = ({onToggleSearch, onToggleBottomSheet}) => {

    return (
        <View style={styles.headerRightContainer}>
            <TouchableOpacity style={styles.searchIconContainer} onPress={() => onToggleSearch()}>
                <Search primaryColor="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.plusIconContainer} onPress={() => onToggleBottomSheet()}>
                <Plus primaryColor="white" />
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    headerRightContainer:{
        display: 'flex',
        flexDirection: 'row'
    },
    searchIconContainer: {
        marginHorizontal: 2.5
    },
    plusIconContainer: {
        marginLeft: 15 
    }
});

export default HeaderRightSection;