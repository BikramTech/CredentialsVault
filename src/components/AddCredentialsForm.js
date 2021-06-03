import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import {
  User,
  Wallet,
  Password,
  CloseSquare,
  Image2,
} from "react-native-iconly";

import { viewHeightPercent, viewWidthPercent } from "../shared/Utils";
import { Colors, ScreenNames } from "../constants";

const AddCredentialsForm = () => {
  const [name, setName] = useState("");
  const [emailOrUserName, setEmailOrUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedApp, setSelectedApp] = useState("");
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    navigation.addListener("focus", () => {
      const homeRouteParams = getHomeRouteParams();

      if (homeRouteParams) {
        debugger;
        setSelectedApp(homeRouteParams);
      }
    });

    return () => {
      navigation.removeListener("focus");
      clearHomeRouteParams();
      setSelectedApp("");
      console.log("Add Bottomsheet Closed!");
    };
  }, []);

  let getHomeRouteParams = () => {
    return navigation
      .dangerouslyGetState()
      .routes.find((route) => route.name === ScreenNames.home).params;
  };

  let clearHomeRouteParams = () => {
    navigation
      .dangerouslyGetState()
      .routes.find((route) => route.name === ScreenNames.home).params = "";
  };

  const clearValue = (setValue) => {
    setValue("");
  };

  const MinusIcon = (onClear, inputValue) => (
    <TouchableOpacity onPress={onClear}>
      <CloseSquare
        style={{ display: inputValue ? "flex" : "none" }}
        primaryColor={Colors.primary}
        size="small"
      />
    </TouchableOpacity>
  );

  const TextInputControl = ({
    inputIcon,
    inputValue,
    onValueChange,
    placeHolderText,
    onClear,
  }) => (
    <View style={styles.controlIconContainer}>
      {inputIcon()}
      <TextInput
        onChangeText={onValueChange}
        blurOnSubmit={true}
        value={inputValue}
        placeholder={placeHolderText}
        placeholderTextColor="gray"
        style={styles.textInputControl}
      />
      {MinusIcon(onClear, inputValue)}
    </View>
  );

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formHeaderText}>Save Credentials</Text>
      {{ selectedApp } && (
        <Image
          source={{ uri: selectedApp.Logo }}
          style={styles.selectedAppLogo}
          resizeMode="contain"
        ></Image>
      )}

      {{ selectedApp } && (
        <Text style={styles.selectedAppName}>{selectedApp.DisplayName}</Text>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.appSearch)}
        style={{
          backgroundColor: Colors.primary,
          padding: "3%",
          borderRadius: viewHeightPercent(2),
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: "4%",
          borderColor: Colors.lightGray,
          borderWidth: 2,
        }}
      >
        <View
          style={{
            alignItems: "center",
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Image2 set="bold" primaryColor={Colors.white} size="small" />
          <Text style={{ color: Colors.white, fontSize: viewHeightPercent(2) }}>
            {" "}
            {selectedApp ? "Choose another logo" : "Choose credentials logo"}
          </Text>
        </View>
      </TouchableOpacity>

      <KeyboardAvoidingView style={styles.formControlsContainer}>
        {TextInputControl({
          inputIcon: () =>
            !selectedApp ? (
              <Wallet set="bold" primaryColor={Colors.primary} size="small" />
            ) : (
              <Image
                source={{ uri: selectedApp.Logo }}
                style={styles.credentialsFieldLogo}
                resizeMode="contain"
              ></Image>
            ),
          inputValue: name,
          onValueChange: (value) => setName(value),
          placeHolderText: "Credentials Name",
          onClear: () => setName(""),
        })}

        {TextInputControl({
          inputIcon: () => (
            <User set="bold" primaryColor={Colors.primary} size="small" />
          ),
          inputValue: emailOrUserName,
          onValueChange: (value) => setEmailOrUserName(value),
          placeHolderText: "Email, username or mobile number",
          onClear: () => setEmailOrUserName(""),
        })}

        {TextInputControl({
          inputIcon: () => (
            <Password set="bold" primaryColor={Colors.primary} size="small" />
          ),
          inputValue: password,
          onValueChange: (value) => setPassword(value),
          placeHolderText: "Password",
          onClear: () => setPassword(""),
        })}

        {TextInputControl({
          inputIcon: () => (
            <Password set="bold" primaryColor={Colors.primary} size="small" />
          ),
          inputValue: confirmPassword,
          onValueChange: (value) => setConfirmPassword(value),
          placeHolderText: "Confirm password",
          onClear: () => setConfirmPassword(""),
        })}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingTop: viewHeightPercent(5),
    marginHorizontal: viewWidthPercent(4),
    overflow: "scroll",
  },

  controlIconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.white,
    ...Platform.select({
      ios: {
        padding: viewHeightPercent(1.5),
      },
      android: {
        paddingHorizontal: viewHeightPercent(1.5),
      },
    }),

    borderRadius: viewHeightPercent(2),
    marginTop: viewHeightPercent(2),
    borderColor: Colors.lightGray,
    borderWidth: 2,
    ...Platform.select({
        android:{
            alignItems: "center",
            height: "15%",
        }
    })
  },

  formHeaderText: {
    fontWeight: "bold",
    fontSize: viewHeightPercent(2.5),
    alignSelf: "center",
    color: Colors.black,
  },

  textInputControl: {
    color: Colors.black,
    flex: 0.9,
    justifyContent: "center",
  },

  formControlsContainer: {
    paddingTop: "10%",
  },

  selectedAppLogo: {
    height: viewHeightPercent(5),
    width: viewHeightPercent(5),
    borderRadius: viewHeightPercent(5) / 2,
    alignSelf: "center",
    marginTop: "5%",
  },

  selectedAppName: {
    fontWeight: "500",
    alignSelf: "center",
    marginTop: "4%",
  },

  credentialsFieldLogo: {
    height: viewHeightPercent(2),
    width: viewHeightPercent(2),
    borderRadius: viewHeightPercent(2) / 2,
  },
});

export default AddCredentialsForm;
