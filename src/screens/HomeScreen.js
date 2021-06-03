import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, StatusBar } from "react-native";
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

const HomeScreen = () => {
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [searchBoxTextValue, setSearchBoxTextValue] = useState("");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

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
    <Text style={{ alignSelf: "center", top: "50%", fontWeight: "700" }}>
      No data
    </Text>
  );

  return (
    <View style={styles.homeContainer}>
      <View style={styles.headerContainer}>
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
      </View>

      <View style={styles.savedAppsCredListContainer}>
        <NoDataFound />
      </View>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        toggleBottomSheet={toggleBottomSheet}
        ContainerComponent={AddCredentialsForm}
      />
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        style={{ flex: 1, zIndex: -1 }}
      ></LinearGradient>
      <StatusBar backgroundColor={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  headerContainer: {
    position: "absolute",
    width: "100%",
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
    width: "100%",
    backgroundColor: Colors.white,
    borderTopRightRadius: viewHeightPercent(20),
    borderBottomLeftRadius: viewHeightPercent(15),
    paddingTop: viewHeightPercent(2),
    top: heightPercentageToDP(20),
    marginHorizontal: viewWidthPercent(1),
    marginBottom: viewWidthPercent(1),
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
