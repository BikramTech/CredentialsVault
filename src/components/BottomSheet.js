
import React, { useEffect } from 'react';
import { View, Animated, StyleSheet, Dimensions, TouchableOpacity, Text, StatusBar } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Colors } from '../constants';
import { viewHeightPercent, viewWidthPercent, windowHeightPercent } from '../shared/Utils'


const BottomSheet = ({ isOpen, toggleBottomSheet, ContainerComponent }) => {

    useEffect(() => {

        if (isOpen) {
            handleOpen();
        }

    }, [isOpen])

    let animation = new Animated.Value(0)

    const handleOpen = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };
     
    const handleClose = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
        toggleBottomSheet();
    };

    const screenHeight = Dimensions.get("window").height;

    const backdrop = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 0.01],
                    outputRange: [screenHeight, 0],
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

    const slideUp = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0.01, 1],
                    outputRange: [0, -1 * screenHeight],
                    extrapolate: "clamp",
                }),
            },
        ],
    };

    const CloseButton = () => <TouchableOpacity style={styles.bottomSheetButtons} onPress={handleClose}>
        <Text style={styles.closeBtnText}>Close</Text>
    </TouchableOpacity>

    const SaveButton = () => <TouchableOpacity style={styles.bottomSheetButtons} onPress={handleClose}>
    <Text style={styles.closeBtnText}>Save</Text>
    </TouchableOpacity>

    return (
        <>
            <Animated.View style={[StyleSheet.absoluteFill, styles.cover, backdrop, {zIndex: isOpen ? -.5: -1}]} />
            <View style={[styles.sheet]}>
            

                <Animated.View style={[styles.popup, slideUp]}>
                <ContainerComponent />


                <View style={styles.buttonsContainer}>

                <SaveButton />
                 <CloseButton />
                 
                 </View>
                 

                </Animated.View>
            </View>
        </>
    )

}

const styles = StyleSheet.create({

    cover: {
        backgroundColor: "rgba(0,0,0,.5)"
    },

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
        borderTopLeftRadius: viewHeightPercent(20),
        borderBottomRightRadius: viewHeightPercent(10),
         zIndex: 1
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
