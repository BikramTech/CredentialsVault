import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, StatusBar, Platform, FlatList, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Show , Hide} from 'react-native-iconly';

import {
  viewHeightPercent,
  viewWidthPercent,
  heightPercentageToDP,
} from "../shared";
import {
  AddCredentialsForm,
  BottomSheet,
  HeaderSearchBox,
  HeaderRightSection,
} from "../components";
import { Colors } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebsitesDataDbService } from '../services';

const HomeScreen = () => {
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [searchBoxTextValue, setSearchBoxTextValue] = useState("");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [credentials, setCredentials] = useState([]);
  const[passwordVisibility, setPasswordVisibility] = useState(false);

  useEffect(() => {
    getAllCredentials();
  }, []);

  const getAllCredentials = () => {
    WebsitesDataDbService.GetCredentialsData().then(resp => {
      debugger;
      console.log(resp);
      setCredentials(resp);
    }).catch(err => {
      debugger;
    })
  }

  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  const toggleSearch = () => {
    const isOpen = !isSearchBoxOpen;
    setIsSearchBoxOpen(isOpen);
    clearSearchBox();
  };

  const onSearchBoxTextChange = (searchText) => {
    setSearchBoxTextValue(searchText);
  };

  const clearSearchBox = () => {
    setSearchBoxTextValue("");
  };

  const toggleCredentialsVisibility = (data) => {
    data.isPasswordVisible = !data.isPasswordVisible;
    setPasswordVisibility(!passwordVisibility)
  }

  const NoDataFound = () => (
    <Text style={{ alignSelf: "center", top: "50%", fontWeight: "700", color: 'gray' }}>
      No data
    </Text>
  );

  const CredentialLogo = (logo) => <Image source={{ uri: logo }} style={{ height: viewHeightPercent(6), width: viewHeightPercent(6), borderRadius: (viewHeightPercent(6) / 2) }} resizeMode='contain'></Image>

  const CredentialsListItem = (data) => (<View style={{ borderBottomColor: Colors.silver, borderBottomWidth: 1, paddingVertical: '5%' }}>

    <View style={styles.credentialsCard}>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {CredentialLogo(data.logo)}


      </View>

      <View style={{ flex: 3, paddingLeft: '5%' }}>
        <Text style={{ fontWeight: '500', fontSize: viewHeightPercent(2.1) }}>{data.name}</Text>

        <View style={{ marginTop: '3%' }}>
          <Text >{data.username}</Text>
          { data.isPasswordVisible && <Text >{data.password}</Text>}
          {!data.isPasswordVisible && <Text style={{fontWeight: 'bold', fontSize: viewHeightPercent(2.5)}} >................</Text>}
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <TouchableOpacity style={{ padding: '15%'}} onPress={() => toggleCredentialsVisibility(data)}>
      { !data.isPasswordVisible && <Show set="bold" size='medium' primaryColor={Colors.primary} />}
      { data.isPasswordVisible && <Hide set="bold" size='medium' primaryColor={Colors.primary} />}
        </TouchableOpacity>

      </View>

    </View>

  </View>)

  return (
    <View style={styles.homeContainer}>
      <SafeAreaView style={styles.headerContainer}>
        {isSearchBoxOpen && (
          <HeaderSearchBox
            searchBoxTextValue={searchBoxTextValue}
            onClearSearchBox={() => clearSearchBox()}
            onToggleSearch={() => toggleSearch()}
            onSearchBoxTextChange={(value) => onSearchBoxTextChange(value)}
          />
        )}
        {!isSearchBoxOpen && (
          <View style={styles.headerWrapper}>
            <Text
              style={{
                fontSize: viewHeightPercent(2.1),
                fontFamily: "HelveticaNeue-Medium",
                color: Colors.white,
              }}
            >
              Credentials Vault
            </Text>
            {!isBottomSheetOpen && (
              <HeaderRightSection
                onToggleSearch={() => toggleSearch()}
                onToggleBottomSheet={() => toggleBottomSheet()}
              />
            )}
          </View>
        )}
      </SafeAreaView>

      <View style={styles.savedAppsCredListContainer}>
        {!credentials?.length && <NoDataFound />}
        <FlatList
          style={{ flex: 1 }}
          data={credentials}
          keyExtractor={(item, index) => index}
          renderItem={({ item, separators }) => CredentialsListItem(item)}
          scrollIndicatorInsets={{ right: 1 }}
          extraData={passwordVisibility}
        />
      </View>



      <BottomSheet
        isOpen={isBottomSheetOpen}
        toggleBottomSheet={toggleBottomSheet}
        ContainerComponent={AddCredentialsForm}
        onFormSubmissionSuccess={getAllCredentials}
      />
      <LinearGradient
        colors={[Colors.primary, Colors.primary]}
        style={{ zIndex: -1, height: 50 }}
      ></LinearGradient>
      <StatusBar backgroundColor={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: Colors.white
  },

  headerContainer: {
    position: "absolute",
    width: "100%"
  },

  headerWrapper: {
    flex: 1,
    flexDirection: "row",
    padding: viewHeightPercent(2.7),
    backgroundColor: Colors.primary,
    justifyContent: "space-between",
  },

  savedAppsCredListContainer: {
    position: "absolute",
    height: viewHeightPercent(70),
    width: "90%",
    backgroundColor: Colors.white,
    borderRadius: viewHeightPercent(5),
    padding: viewHeightPercent(2),
    top: heightPercentageToDP(15),
    alignSelf: 'center',
    bottom: heightPercentageToDP(10),
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
      }
    })
  },

  upperSection: {
    minHeight: Dimensions.get("window").height / 5,
    backgroundColor: "red",
  },

  credentialsListingHeaderText: {
    fontSize: viewHeightPercent(2.2),
    alignSelf: "center",
    fontWeight: "bold",
  },

  noDataFoundImageIcon: {
    flex: 0.2,
    aspectRatio: 1.5,
    resizeMode: "contain",
    alignSelf: "center",
    top: "25%",
  },

  credentialsCard: {
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        
      }
    }),flex: 1, flexDirection: 'row', padding: '3%', borderTopLeftRadius: viewHeightPercent(3), borderBottomRightRadius: viewHeightPercent(3), borderRadius: viewHeightPercent(1)
  }
});

export default HomeScreen;
