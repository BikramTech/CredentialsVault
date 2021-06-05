import React from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";

import { Search, CloseSquare } from "react-native-iconly";

import { Colors } from "../constants";
import { viewHeightPercent } from "../shared/Utils";

const HeaderSearchBoxScreen = ({
  searchBoxTextValue,
  onClearSearchBox,
  onToggleSearch,
  onSearchBoxTextChange,
}) => {
  const CrossIcon = () => (
    <TouchableOpacity onPress={onClearSearchBox}>
      <CloseSquare
        style={{ display: searchBoxTextValue ? "flex" : "none" }}
        primaryColor={Colors.primary}
        size="small"
      />
    </TouchableOpacity>
  );

  const CancelButton = () => (
    <TouchableOpacity onPress={onToggleSearch}>
      <Text style={{ color: Colors.white }}>Cancel</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.primary
      }}
    >
      <View style={styles.searchBoxContainer}>
        <View style={styles.searchIconContainer}>
          <Search primaryColor={Colors.primary} size="small" />
          <TextInput
            onChangeText={onSearchBoxTextChange}
            blurOnSubmit={false}
            value={searchBoxTextValue}
            placeholder="Search"
            style={styles.searchBoxInput}
          />
          {CrossIcon()}
        </View>
        <View style={styles.cancelButtonContainer}>
          <CancelButton />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBoxContainer: {
    backgroundColor: Colors.primary,
    display: "flex",
    ...Platform.select({
      android: {
        padding: viewHeightPercent(1),
        flexDirection: "row",
        justifyContent: "center",
      },
      ios: {
        padding: viewHeightPercent(1.5),
        flexDirection: "row",
        justifyContent: "center",
      },
    }),
  },

  searchIconContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 0.9,
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    ...Platform.select({
      android: {
        paddingHorizontal: "3%",
        alignItems: "center",
      },
      ios: {
        padding: "3%",
      },
    }),
    borderRadius: viewHeightPercent(2),
  },

  searchBoxInput: {
    color: Colors.black,
    flex: 0.9,
  },

  cancelButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.2,
  },
});

export default HeaderSearchBoxScreen;
