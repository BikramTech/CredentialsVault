import React from 'react';
import { SafeAreaView, View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { Search, CloseSquare } from 'react-native-iconly';

import { Colors } from '../constants';
import { viewHeightPercent } from '../shared/Utils';

const HeaderSearchBoxScreen = ({ searchBoxTextValue, onClearSearchBox, onToggleSearch, onSearchBoxTextChange }) => {


    const CrossIcon = () => (<TouchableOpacity onPress={onClearSearchBox}><CloseSquare primaryColor={Colors.primary} /></TouchableOpacity>)

    const CancelButton = () => (
        <TouchableOpacity onPress={onToggleSearch}><Text style={{ color: Colors.white }}>Cancel</Text></TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ backgroundColor: Colors.primary, borderBottomColor:"#545454", borderBottomWidth: 1 }}>
            <View style={styles.searchBoxContainer}>
                <View style={styles.searchIconContainer}>
                    <Search primaryColor={Colors.primary} />
                    <TextInput onChangeText={onSearchBoxTextChange} blurOnSubmit={false} value={searchBoxTextValue} placeholder="Search" placeholderTextColor={"white"} style={styles.searchBoxInput} />
                    {searchBoxTextValue ? CrossIcon() : React.ReactNode}
                </View>
                <View style={styles.cancelButtonContainer}>
                    <CancelButton />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
    searchBoxContainer: {
        backgroundColor: Colors.primary,
        display: 'flex',
        padding: viewHeightPercent(1.5),
        flexDirection: 'row',
        justifyContent:'center'
    },

    searchIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        flex: .9,
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        padding: viewHeightPercent(1),
        borderRadius: viewHeightPercent(2)
    },

    searchBoxInput: {
        color: Colors.black,
        flex: .9 
    },

    cancelButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .2
    }
})

export default HeaderSearchBoxScreen;