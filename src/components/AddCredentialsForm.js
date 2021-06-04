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

import { WebsitesDataDbService } from '../services';
import { viewHeightPercent, viewWidthPercent, generateUUID } from "../shared/Utils";
import { Colors, ScreenNames } from "../constants";

const AddCredentialsForm = ({ isBottomSheetOpen, isSubmittingForm, onFormSubmissionCancel, onFormSubmissionSuccess }) => {

    const [name, setName] = useState("");
    const [emailOrUserName, setEmailOrUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedApp, setSelectedApp] = useState("");
    const navigation = useNavigation();
    const route = useRoute();

    const [textInputs, setTextInputs] = useState({})

    const [textInputRefs, setTextInputRefs] = useState({
        nameInputRef: '',
        emailInputRef: '',
        passwordInputRef: '',
        confirmPasswordInputRef: ''
    });

    useEffect(() => {
        if (!isBottomSheetOpen) {
            resetForm()
        }
        else {
            const homeRouteParams = getHomeRouteParams();

            if (!homeRouteParams) {
                setSelectedApp('');
            }
        }

        if (isSubmittingForm) {
            saveCredentials();
        }
    }, [isBottomSheetOpen, isSubmittingForm])

    useEffect(() => {
        navigation.addListener("focus", () => {
            const homeRouteParams = getHomeRouteParams();

            if (homeRouteParams) {
                setSelectedApp(homeRouteParams);
            }
        });

        return () => {
            navigation.removeListener("focus");
        };
    }, []);

    const reInitializeInputControls = () => {
        setName('');
        setEmailOrUserName('');
        setPassword("");
        setConfirmPassword('');
        blurAllControls();
    }

    const resetForm = () => {
        clearHomeRouteParams();
        setSelectedApp("");
        setTextInputs({});
        reInitializeInputControls();
    }

    const blurAllControls = () => {
        if (textInputRefs) {
            Object.entries(textInputRefs).forEach(ref => {
                const inputRef = ref[1];
                if (inputRef) {
                    inputRef.blur();
                }
            })
        }
    }

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

    const saveCredentials = () => {

        const credentialsData = getCredentialsData();

        WebsitesDataDbService.InsertCredentialsData(credentialsData).then(resp => {
            onFormSubmissionSuccess();
        }).catch(err => {
            onFormSubmissionCancel();
        });

    }

    const getCredentialsData = () => {
        const id = generateUUID();
        const credentialsLogoId = selectedApp.Id;

        return { id, name, username: emailOrUserName, password, credentialsLogoId };
    }

    const MinusIcon = (onClear, inputValue) => (
        <TouchableOpacity onPress={onClear}>
            <CloseSquare
                style={{ display: inputValue ? "flex" : "none" }}
                primaryColor={Colors.primary}
                size="small"
            />
        </TouchableOpacity>
    );

    const onTextInputControlFocus = (inputFocused) => {

        setTextInputs({ [inputFocused]: true });
    }

    const openAppSearch = () => {
        navigation.navigate(ScreenNames.appSearch);
        blurAllControls();
    }


    const TextInputControl = ({
        inputIcon,
        inputValue,
        onValueChange,
        placeHolderText,
        onClear,
        isInputFocused,
        textInputRef
    }) => (
            <View style={[styles.controlIconContainer, textInputs[isInputFocused] ? styles.focusedTextInput : styles.blurredTextInput]}>
                {inputIcon()}
                <TextInput
                    onFocus={() => onTextInputControlFocus(isInputFocused)}
                    ref={ref => textInputRefs[textInputRef] = ref}
                    onChangeText={onValueChange}
                    blurOnSubmit={true}
                    value={inputValue}
                    placeholder={placeHolderText}
                    placeholderTextColor="gray"
                    style={styles.textInputControl}
                    textContentType={'name'}
                />
                {MinusIcon(onClear, inputValue)}
            </View>
        );

    return (
        <View style={styles.formContainer}>
            <Text style={styles.formHeaderText}>Save Credentials</Text>
            { selectedApp?.Logo && (
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
                onPress={openAppSearch}
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
                    isInputFocused: 'isNameInputFocused',
                    textInputRef: 'nameInputRef'
                })}

                {TextInputControl({
                    inputIcon: () => (
                        <User set="bold" primaryColor={Colors.primary} size="small" />
                    ),
                    inputValue: emailOrUserName,
                    onValueChange: (value) => setEmailOrUserName(value),
                    placeHolderText: "Email, username or mobile number",
                    onClear: () => setEmailOrUserName(""),
                    isInputFocused: 'isEmailInputFocused',
                    textInputRef: 'emailInputRef'
                })}

                {TextInputControl({
                    inputIcon: () => (
                        <Password set="bold" primaryColor={Colors.primary} size="small" />
                    ),
                    inputValue: password,
                    onValueChange: (value) => setPassword(value),
                    placeHolderText: "Password",
                    onClear: () => setPassword(""),
                    isInputFocused: 'isPasswordInputFocused',
                    textInputRef: 'passwordInputRef'
                })}

                {TextInputControl({
                    inputIcon: () => (
                        <Password set="bold" primaryColor={Colors.primary} size="small" />
                    ),
                    inputValue: confirmPassword,
                    onValueChange: (value) => setConfirmPassword(value),
                    placeHolderText: "Confirm password",
                    onClear: () => setConfirmPassword(""),
                    isInputFocused: 'isConfirmPasswordInputFocused',
                    textInputRef: 'confirmPasswordInputRef'
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

        marginTop: viewHeightPercent(2),
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 2,
        ...Platform.select({
            android: {
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

    focusedTextInput: {
        borderBottomColor: Colors.primary
    },

    blurredTextInput: {
        borderBottomColor: Colors.lightGray
    }
});

export default AddCredentialsForm;
