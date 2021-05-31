import React, {Component, useEffect} from 'react';

import { useNavigation } from '@react-navigation/native';


import { HomeScreen }  from '../screens';

const Home = ({isBottomSheetOpen, onToggleBottomSheet}) => {

  const navigation = useNavigation();

  useEffect(() => {

    return () => {

    };
}, []);

  return (
    <HomeScreen isBottomSheetOpen={isBottomSheetOpen} onToggleBottomSheet={onToggleBottomSheet}/>
  );
};

export default Home;
