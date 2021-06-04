import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, StatusBar, Platform, StatusBarPropsIOS } from "react-native";
import LinearGradient from "react-native-linear-gradient";

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

  useEffect(() => {
    getAllCredentials();
  }, []);

  const getAllCredentials = () => {
    WebsitesDataDbService.GetCredentialsData().then(resp => {
      debugger;
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

  const NoDataFound = () => (
    <Text style={{ alignSelf: "center", top: "50%", fontWeight: "700", color: 'gray' }}>
      No data
    </Text>
  );

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
        <NoDataFound />
      </View>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        toggleBottomSheet={toggleBottomSheet}
        ContainerComponent={AddCredentialsForm}
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

    paddingTop: viewHeightPercent(2),
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
});

export default HomeScreen;
