import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { viewHeightPercent, viewWidthPercent } from '../shared';
import { AddCredentialsForm, BottomSheet} from '../components';
import { Colors } from '../constants';

const HomeScreen = ({isBottomSheetOpen, onToggleBottomSheet}) => {

  

  const NoDataFound = () => <Text style={{alignSelf:'center', top: viewHeightPercent(30), fontWeight:'700'}}>No data</Text>

  return (
    
      <LinearGradient colors={[Colors.primary, Colors.secondary, Colors.primary, Colors.secondary]} style={styles.homeContainer}>

      
      <View style={styles.upperSection} />
      

      <View style={styles.savedAppsCredListContainer}>
      
      {/* <Text style={styles.credentialsListingHeaderText}>Credentials</Text> */}

      {NoDataFound()}

      </View>

      <BottomSheet isOpen={isBottomSheetOpen} toggleBottomSheet={onToggleBottomSheet} ContainerComponent={AddCredentialsForm}/>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  
  homeContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.white
  },

  savedAppsCredListContainer: {
    display: 'flex',
    height: viewHeightPercent(75),
    backgroundColor: Colors.white,
    borderTopRightRadius: viewHeightPercent(20),
    borderBottomLeftRadius: viewHeightPercent(15),
    paddingTop: viewHeightPercent(2),
    margin: viewWidthPercent(1)
  },

  upperSection: {
    display: 'flex',
    height: viewHeightPercent(25),
    borderBottomRightRadius: viewHeightPercent(20)
  },

  credentialsListingHeaderText: {
    fontSize: viewHeightPercent(2.2),
    alignSelf: 'center',
    fontWeight: 'bold'
  },
 
  noDataFoundImageIcon: {
    flex: .2,
    aspectRatio: 1.5,
    resizeMode: 'contain',
    alignSelf:'center',
    top: '25%'
  }

});

export default HomeScreen;