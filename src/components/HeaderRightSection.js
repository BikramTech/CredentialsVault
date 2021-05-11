import React, { useRef } from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions, Text } from 'react-native';

import { Search, Plus } from 'react-native-iconly';
import BottomSheet from 'react-native-animated-bottom-sheet';

import { viewHeightPercent } from '../shared/Utils';

const HeaderRightSection = ({onToggleSearch}) => {

    const bottomSheetRef = useRef();

    const renderBottomSheetContent = (onSwipe) => (
        <View 
            style={{
                flex: 1, 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor:'red'}}>
            <Text>{onSwipe ? 'swiping' : 'not swiping'}</Text>
        </View>
    )

    const openAddBottomSheet = () => {
        bottomSheetRef.current.open();
    }

    return (
        <View style={styles.headerRightContainer}>
            <TouchableOpacity style={styles.searchIconContainer} onPress={() => onToggleSearch()}>
                <Search primaryColor="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.plusIconContainer} onPress={() => openAddBottomSheet()}>
                <Plus primaryColor="white" />
            </TouchableOpacity>
            <BottomSheet 
            ref={bottomSheetRef}
            renderContent={renderBottomSheetContent}
            visibleHeight={Dimensions.get('window').height/3}
            onClose={() => console.log('bottomSheet closed!')}
            
            />
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
        marginHorizontal: 15 
    }
});

export default HeaderRightSection;