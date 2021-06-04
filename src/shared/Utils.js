import { Dimensions, PixelRatio } from 'react-native';

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const windowHeight = Dimensions.get("screen").height;

const viewHeightPercent = (percent) => {
    const percentInDecimal = screenHeight / 100;
    return PixelRatio.roundToNearestPixel(percentInDecimal * percent);
}

const viewWidthPercent = (percent) => {
    const percentInDecimal = screenWidth / 100;
    return percentInDecimal * percent;
}

const windowHeightPercent = (percent) => {
    const percentInDecimal = windowHeight / 100;
    return percentInDecimal * percent;
}

const heightPercentageToDP = heightPercent => {
    // Parse string percentage input and convert it to number.
    const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);
  
    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
  };

const  generateUUID = () => {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

export {
    viewHeightPercent,
    viewWidthPercent,
    windowHeightPercent,
    heightPercentageToDP,
    generateUUID
};