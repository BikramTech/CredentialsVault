import 'react-native-gesture-handler';
import React from 'react';

import AppNavigation from './AppNavigation';

import { WebsitesDataDbService } from './src/services'

const App= () => {

  WebsitesDataDbService.CreateWebsitesDataTableIfNotExists().then(resp => {
    console.log('Successfully created CredentialsData table!');
  }).catch(err => {
    console.log('Error while creating CredentialsData table!');
    console.log(err);
  })

  return (
    <AppNavigation>
    </AppNavigation>
  );
};

export default App;
