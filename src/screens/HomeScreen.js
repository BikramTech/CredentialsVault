import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Show, Hide, Delete } from "react-native-iconly";

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
import { WebsitesDataDbService } from "../services";

const HomeScreen = () => {
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [searchBoxTextValue, setSearchBoxTextValue] = useState("");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [credentials, setCredentials] = useState([]);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState("");

  useEffect(() => {
    getAllCredentials();
  }, []);

  const getAllCredentials = () => {
    WebsitesDataDbService.GetCredentialsData()
      .then((resp) => {
        console.log(resp);
        setCredentials(resp);
      })
      .catch((err) => {});
  };

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
    setPasswordVisibility(!passwordVisibility);
  };

  const toggleCredentialCardSelection = (selectedId) => {
    if (selectedCardId === selectedId) {
      setSelectedCardId("");
    } else {
      setSelectedCardId(selectedId);
    }
  };

  const deleteCredential = (selectedCredentialName) => {
    const alertMessage = `Are you sure you want to delete ${selectedCredentialName} credentials?`;

    const confirmButton = getButtonForDeleteAlert(
      "Yes",
      onDeleteConfirm.bind(this),
      "default"
    );
    const cancelButton = getButtonForDeleteAlert(
      "No",
      onDeleteCancel.bind(this),
      "default"
    );

    Alert.alert("", alertMessage, [confirmButton, cancelButton]);
  };

  const getButtonForDeleteAlert = (text, onPress, style) => {
    return { text, onPress, style };
  };

  const onDeleteConfirm = () => {
    WebsitesDataDbService.DeleteCredential(selectedCardId).then(resp => {
      
      ToastAndroid.showWithGravity("Deleted Successfull!", 3000, ToastAndroid.BOTTOM);

      const filteredCredentials = credentials.filter(credential =>  credential.id !== selectedCardId);
      setCredentials(filteredCredentials);
      setSelectedCardId("");
    }).catch(err => {
      alert("Some error has occured");
    })
    
  };

  const onDeleteCancel = () => {
    setSelectedCardId("");
  };

  const NoDataFound = () => (
    <Text
      style={{
        alignSelf: "center",
        top: "50%",
        fontWeight: "700",
        color: "gray",
      }}
    >
      No data
    </Text>
  );

  const CredentialLogo = (logo) => (
    <Image
      source={{ uri: logo }}
      style={{
        height: viewHeightPercent(6),
        width: viewHeightPercent(6),
        borderRadius: viewHeightPercent(6) / 2,
      }}
      resizeMode="contain"
    ></Image>
  );

  const CredentialsListItem = (data) => (
    <TouchableOpacity
      style={{
        borderBottomColor: Colors.silver,
        borderBottomWidth: 1,
        paddingVertical: "5%",
      }}
      onPress={() => toggleCredentialCardSelection(data.id)}
    >
      <View style={styles.credentialsCard}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {CredentialLogo(data.logo)}
        </View>

        <View style={{ flex: 3, paddingLeft: "5%" }}>
          <Text
            style={{ fontWeight: "bold", fontSize: viewHeightPercent(2.1) }}
          >
            {data.name}
          </Text>

          <View style={{ marginTop: "3%" }}>
            <Text>{data.username}</Text>
            {data.isPasswordVisible && <Text>{data.password}</Text>}
            {!data.isPasswordVisible && (
              <Text style={{ fontWeight: "bold" }}>***********</Text>
            )}
          </View>
        </View>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{ padding: "15%" }}
            onPress={() => toggleCredentialsVisibility(data)}
          >
            {!data.isPasswordVisible && (
              <Show set="bold" size="medium" primaryColor={Colors.primary} />
            )}
            {data.isPasswordVisible && (
              <Hide set="bold" size="medium" primaryColor={Colors.primary} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {selectedCardId === data.id && (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingRight: "7%",
          }}
        >
          <TouchableOpacity
            style={{ padding: "2%" }}
            onPress={() => deleteCredential(data.name)}
          >
            <Delete set="bold" size="medium" primaryColor={Colors.red} />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
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
        {!credentials?.length && <NoDataFound />}
        <FlatList
          style={{ flex: 1 }}
          data={credentials}
          keyExtractor={(item, index) => index}
          renderItem={({ item, separators }) => CredentialsListItem(item)}
          scrollIndicatorInsets={{ right: 2 }}
          extraData={passwordVisibility}
        />
      </View>

      {isBottomSheetOpen && (
        <BottomSheet
          isOpen={isBottomSheetOpen}
          toggleBottomSheet={toggleBottomSheet}
          ContainerComponent={AddCredentialsForm}
          onFormSubmissionSuccess={getAllCredentials}
        />
      )}
      <StatusBar backgroundColor={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: Colors.white,
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
    height: viewHeightPercent(75),
    width: "90%",
    backgroundColor: Colors.white,
    borderRadius: viewHeightPercent(5),
    padding: viewHeightPercent(2),
    top: heightPercentageToDP(12.5),
    alignSelf: "center",
    bottom: heightPercentageToDP(2),
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
      },
    }),
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
    flex: 1,
    flexDirection: "row",
    padding: "3%",
    borderTopLeftRadius: viewHeightPercent(3),
    borderBottomRightRadius: viewHeightPercent(3),
    borderRadius: viewHeightPercent(1),
  },
});

export default HomeScreen;
