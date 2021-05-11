import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { viewHeightPercent, viewWidthPercent } from '../shared';
import BottomSheet from '../components/BottomSheet';
import { Colors } from '../constants';

const HomeScreen = ({isBottomSheetOpen, onToggleBottomSheet}) => {
  return (
    <View style={styles.homeContainer}>
      
      <View style={styles.savedAppsCredListContainer}>
      
      </View>
      <BottomSheet isOpen={isBottomSheetOpen} toggleBottomSheet={onToggleBottomSheet}/>
    </View>
  );
};

const styles = StyleSheet.create({
  
  homeContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.black
  },

  savedAppsCredListContainer: {
    display: 'flex',
    flex: .8,
    backgroundColor: "#E1E1E1",
    borderTopLeftRadius: viewHeightPercent(5),
    borderTopRightRadius: viewHeightPercent(5),
  }
});

export default HomeScreen;