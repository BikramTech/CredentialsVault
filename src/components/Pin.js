import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableHighlight,
  Text,
  Image,
} from "react-native";
import { CloseSquare } from "react-native-iconly";
import { useNavigation } from "@react-navigation/native";

import { Colors, ScreenNames } from "../constants";
import { viewHeightPercent, viewWidthPercent } from "../shared";

const Pin = () => {
  const [pinNumber, setPinNumber] = useState("");
  const [highlightedPinBox, setHighlightedPinBox] = useState(0);
  const [isLoadingPinBoxesVisible, setIsLoadingPinBoxesVisible] = useState(
    false
  );
  const navigation = useNavigation();

  const pinInputBoxes = ["", "", "", ""];

  const keypadButtons = [
    { name: "1", value: 1 },
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
    { name: "5", value: 5 },
    { name: "6", value: 6 },
    { name: "7", value: 7 },
    { name: "8", value: 8 },
    { name: "9", value: 9 },
    { name: "", value: null },
    { name: "0", value: 0 },
  ];

  const DeleteButton = () => (
    <CloseSquare set="curved" primaryColor={Colors.black} size="medium" />
  );

  const stopPinBoxAnimation = setTimeout(() => {
    if (highlightedPinBox !== 3) {
      setHighlightedPinBox(highlightedPinBox + 1);
      return;
    }
    setHighlightedPinBox(0);
  }, 100);

  const AppLogo = () => (
    <Image
      source={{
        uri:
          "https://www.sdcard.org/cms/wp-content/uploads/2021/01/SD-Association-Logo_Blue_Vertical_CMYKl-01.png",
      }}
      style={styles.appLogo}
      resizeMode="contain"
    ></Image>
  );

  const onKeypadNumClick = (value) => {
    if (pinNumber?.length === 4) {
      return;
    }

    const updatedPinNumber = `${pinNumber}${value}`;
    if (updatedPinNumber.length === 4) {
      setIsLoadingPinBoxesVisible(true);
      setTimeout(() => {
        navigation.navigate(ScreenNames.home);
        setIsLoadingPinBoxesVisible(false);
        setPinNumber("");
        clearTimeout();
      }, 1000);
    }
    setPinNumber(updatedPinNumber);
  };

  const onDeleteNumClick = () => {
    if (!pinNumber || !pinNumber.length) {
      return;
    }

    const lastIndex = pinNumber.length - 1;
    const updatedPinNumber = pinNumber.substring(0, lastIndex);
    setPinNumber(updatedPinNumber);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.white} />

      <View style={styles.topContainer}>
        {AppLogo()}
        <Text style={styles.headerText}>Set Your PIN</Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "2%",
          }}
        >
          {!isLoadingPinBoxesVisible
            ? pinInputBoxes.length &&
              pinInputBoxes.map((x, index) => (
                <View
                  key={index}
                  style={{
                    borderWidth: 2,
                    borderColor: Colors.black,
                    height: viewHeightPercent(2.5),
                    width: viewHeightPercent(2.5),
                    borderRadius: viewHeightPercent(2.5) / 2,
                    marginHorizontal: "2.5%",
                    backgroundColor:
                      pinNumber.length > index
                        ? Colors.graphiteBlack
                        : Colors.white,
                  }}
                />
              ))
            : pinInputBoxes.length &&
              pinInputBoxes.map((x, index) => (
                <View
                  key={index}
                  style={{
                    height: viewHeightPercent(2),
                    width: viewHeightPercent(2),
                    borderRadius: viewHeightPercent(2) / 2,
                    marginHorizontal: "2.5%",
                    backgroundColor:
                      index === highlightedPinBox
                        ? Colors.graphiteBlack
                        : Colors.gray,
                  }}
                />
              ))}
        </View>
      </View>

      <View style={styles.bottomContainer}>
        {keypadButtons &&
          keypadButtons.map((keypadBtn, index) => (
            <TouchableHighlight key={index} style={styles.keypadButtonWrapper}>
              <TouchableHighlight
                disabled={keypadBtn.value === null}
                underlayColor={"rgba(0,0,0,.10)"}
                onPress={() => onKeypadNumClick(keypadBtn.value)}
                style={styles.keypadButton}
              >
                <Text style={styles.keypadButtonText}>{keypadBtn.name}</Text>
              </TouchableHighlight>
            </TouchableHighlight>
          ))}

        <TouchableHighlight style={styles.keypadButtonWrapper}>
          <TouchableHighlight
            underlayColor={"rgba(0,0,0,.10)"}
            onPress={onDeleteNumClick}
            style={styles.keypadButton}
          >
            {DeleteButton()}
          </TouchableHighlight>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topContainer: {
    flex: 2,
    display: "flex",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  keypadButton: {
    height: viewHeightPercent(7),
    width: viewHeightPercent(7),
    borderRadius: viewHeightPercent(7) / 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  keypadButtonWrapper: {
    width: viewWidthPercent(33.33),
    alignItems: "center",
    paddingVertical: ".4%",
  },

  keypadButtonText: {
    fontWeight: "900",
    fontSize: viewHeightPercent(2),
  },

  appLogo: {
    height: viewHeightPercent(7),
    width: viewHeightPercent(7),
    borderRadius: viewHeightPercent(7) / 2,
  },

  headerText: {
    fontWeight: "900",
    fontSize: viewHeightPercent(2.5),
    marginVertical: "5%",
  },
});

export default Pin;
