import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { viewHeightPercent, viewWidthPercent } from '../shared';
import { AddCredentialsForm, BottomSheet} from '../components';
import { Colors } from '../constants';

const HomeScreen = ({isBottomSheetOpen, onToggleBottomSheet}) => {
  return (
    
      <LinearGradient colors={['#755bea', '#ff72c0', '#755bea', '#ff72c0']} style={styles.homeContainer}>

      
      <View style={styles.savedAppsCredListContainer}>
      
      </View>
      <BottomSheet isOpen={isBottomSheetOpen} toggleBottomSheet={onToggleBottomSheet} ContainerComponent={AddCredentialsForm}/>
      </LinearGradient>
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
    backgroundColor: Colors.white,
    borderTopLeftRadius: viewHeightPercent(5),
    borderTopRightRadius: viewHeightPercent(5),
  }
});

export default HomeScreen;