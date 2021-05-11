import React, {Component} from 'react';

import { HomeScreen }  from '../screens';

const Home = ({isBottomSheetOpen, onToggleBottomSheet}) => {

  return (
    <HomeScreen isBottomSheetOpen={isBottomSheetOpen} onToggleBottomSheet={onToggleBottomSheet}/>
  );
};

export default Home;
