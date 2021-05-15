import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';

import {  User, Wallet, Password, CloseSquare } from 'react-native-iconly';

import { viewHeightPercent, viewWidthPercent } from '../shared/Utils';
import { Colors } from '../constants';

const AddCredentialsForm = () => {

    const [ name, setName] = useState("");
    const [ emailOrUserName, setEmailOrUserName] = useState("");
    const [ password, setPassword] = useState("");
    const [ confirmPassword, setConfirmPassword] = useState("");


    const clearValue = (setValue) => {
        setValue("");
    };

    const MinusIcon = (onClear) => (<TouchableOpacity onPress={onClear}>
    <CloseSquare primaryColor={Colors.primary} />
    </TouchableOpacity>)

    const TextInputControl = ({ inputIcon, inputValue, onValueChange, placeHolderText, onClear}) => <View style={styles.controlIconContainer}>
        {inputIcon()}
        <TextInput onChangeText={onValueChange} blurOnSubmit={true} value={inputValue} placeholder={placeHolderText} placeholderTextColor="gray" style={styles.textInputControl} />
        {inputValue ? MinusIcon(onClear) : React.ReactNode}
    </View>

    return <View style={styles.formContainer}>
         
         <Text style={styles.formHeaderText}> Save Credentials</Text>

         <KeyboardAvoidingView style={styles.formControlsContainer}>

        
         {
             TextInputControl(
             {inputIcon: () => <Wallet set="bold" primaryColor={Colors.primary}/>,
              inputValue: name,
              onValueChange: (value) => setName(value),
              placeHolderText: 'Credentials Name',
              onClear:() => setName("")
              })
         }
         

         
         {TextInputControl({inputIcon: () => <User set="bold" primaryColor={Colors.primary}/>, inputValue: emailOrUserName, onValueChange: (value) => setEmailOrUserName(value), placeHolderText: 'Email or username', onClear:() => setEmailOrUserName("")})}
       

         
         {TextInputControl({inputIcon: () => <Password set="bold" primaryColor={Colors.primary}/>, inputValue: password, onValueChange: (value) => setPassword(value), placeHolderText: 'Password', onClear:() => setPassword("")})}
         

         
         {TextInputControl({inputIcon: () => <Password set="bold" primaryColor={Colors.primary}/>, inputValue: confirmPassword, onValueChange: (value) => setConfirmPassword(value), placeHolderText: 'Confirm password', onClear:() => setConfirmPassword("")})}
         

         </KeyboardAvoidingView>
    
         

    </View>
}

const styles = StyleSheet.create({

    formContainer:{
        paddingTop: viewHeightPercent(5),
        marginHorizontal: viewWidthPercent(4),
        overflow: 'scroll'
    },

    controlIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: Colors.white,
        padding: viewHeightPercent(1.5),
        borderRadius: viewHeightPercent(2),
        marginTop: viewHeightPercent(2)
    },

    formHeaderText: {
       fontWeight: 'bold',
       fontSize: viewHeightPercent(2)
    },

    textInputControl: {
        color: Colors.black,
        flex: .9
    },

    formControlsContainer: {
        paddingTop:viewHeightPercent(10)
    }
})

export default AddCredentialsForm;
