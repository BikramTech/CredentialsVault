
import React, { useEffect, useState } from 'react';
import { View, Animated, StyleSheet, Dimensions, TouchableOpacity, Text, StatusBar, ToastAndroid } from 'react-native';

import { Colors } from '../constants';
import { viewHeightPercent, viewWidthPercent, windowHeightPercent } from '../shared/Utils';

const animation = new Animated.Value(0);

class BottomSheet extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            isFormSubmitButtonClicked: false,
            
        }
        
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.handleOpen();
    }

    handleOpen = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    handleClose = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
        this.props.toggleBottomSheet();
    };

   screenHeight = Dimensions.get("window").height;

   backdrop = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 0.01],
                    outputRange: [this.screenHeight, 0],
                    extrapolate: "clamp",
                }),
            },
        ],
        opacity: animation.interpolate({
            inputRange: [0.01, 0.5],
            outputRange: [0, 1],
            extrapolate: "clamp",
        }),
    };

    slideUp = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0.01, 1],
                    outputRange: [0, -1 * this.screenHeight],
                    extrapolate: "clamp",
                }),
            },
        ],
    };

    handleSubmitButtonPress = () => {
        this.setState({ isFormSubmitButtonClicked: true});
    }

    handleFormSubmissionCancel = () => {
        this.setState({ isFormSubmitButtonClicked: false});
    }

    handleFormSubmissionSuccess = () => {
        this.setState({ isFormSubmitButtonClicked: false});
        this.handleClose();
        this.props.onFormSubmissionSuccess();
    }

    CancelButton = () => <TouchableOpacity style={styles.bottomSheetButtons} onPress={this.handleClose}>
        <Text style={styles.closeBtnText}>Cancel</Text>
    </TouchableOpacity>

    SubmitButton = () => <TouchableOpacity style={styles.bottomSheetButtons} onPress={this.handleSubmitButtonPress}>
    <Text style={styles.closeBtnText}>Save</Text>
    </TouchableOpacity>



    render() {
        const {ContainerComponent} = this.props;
        return( <>
        <Animated.View style={[StyleSheet.absoluteFill,  this.backdrop, {zIndex: this.props.isOpen ? -.5: -1, backgroundColor: this.props.isOpen? "rgba(0,0,0,.5)": Colors.white}]} />
        <View style={[styles.sheet]}>
        

            <Animated.View style={[styles.popup, this.slideUp]}>
            <ContainerComponent isBottomSheetOpen={this.props.isOpen} isSubmittingForm={this.state.isFormSubmitButtonClicked} onFormSubmissionCancel={this.handleFormSubmissionCancel} onFormSubmissionSuccess={this.handleFormSubmissionSuccess} />


            <View style={styles.buttonsContainer}>

            {this.SubmitButton()}
             {this.CancelButton()}
             
             </View>
             

            </Animated.View>
        </View>
    </>)}
}

const styles = StyleSheet.create({

    sheet: {
        position: "absolute",
        top: Dimensions.get("window").height,
        left: 0,
        right: 0,
        height: "100%",
        justifyContent: "flex-end"
    },

    popup: {
        position: "relative",
        width: '100%',
        height: windowHeightPercent(85),
        justifyContent:'space-between',
        margin: viewWidthPercent(1),
        backgroundColor:'white',
        borderTopLeftRadius: viewHeightPercent(3),
        borderTopRightRadius: viewHeightPercent(3),
        zIndex: 1,
        elevation: 10
        },

    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems: 'center',
        paddingBottom: viewHeightPercent(2)
        
    },

    bottomSheetButtons: {
        padding: viewHeightPercent(2),
        alignItems: 'center',
        justifyContent:'center'
    },

    closeBtnText: {
        color: Colors.primary,
        fontSize: viewHeightPercent(2),
        fontWeight: 'bold'
    },

    controlsContainer: {
        flex:1, borderTopLeftRadius: viewHeightPercent(15), justifyContent: 'space-between',
        borderBottomRightRadius: viewHeightPercent(15)
    }
});
export default BottomSheet;
