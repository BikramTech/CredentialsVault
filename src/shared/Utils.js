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

export {
    viewHeightPercent,
    viewWidthPercent,
    windowHeightPercent,
    heightPercentageToDP
};