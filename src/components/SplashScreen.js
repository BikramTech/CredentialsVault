import React, { useState, useEffect } from 'react';
import {
    Animated,
    Button,
    Dimensions,
    Image,
    Text
} from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { viewHeightPercent, viewWidthPercent } from '../shared';
import { Colors, ScreenNames } from '../constants'

let ScreenWidth = Dimensions.get("window").width;
let logoWidth = ScreenWidth - 40;
if (logoWidth > 550) logoWidth = 550;


const FadeInView = (props) => {
    const [fadeAnim] = useState(new Animated.Value(0));

    React.useEffect(() => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: false }).start();
    }, [])

    return (<Animated.View style={{ ...props.style, opacity: fadeAnim }}>
        {props.children}
    </Animated.View>
    );
}

const SplashScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.replace(ScreenNames.pinScreen)
        }, 1500);
    },[])


    return (

        <FadeInView style={{ justifyContent: "center", alignItems: 'center', height: viewHeightPercent(100), backgroundColor: Colors.white }}>

            <Image source={require('../assets/images/AppLogo.png')} style={{ height: viewWidthPercent(27), width: viewWidthPercent(90), resizeMode: 'contain' }} ></Image>

        </FadeInView>

    );
}

export default SplashScreen;