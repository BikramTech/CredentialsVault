import { Dimensions } from "react-native";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const viewHeightPercent = (percent) => {
    const percentInDecimal = screenHeight / 100;
    return percentInDecimal * percent;
}

const viewWidthPercent = (percent) => {
    const percentInDecimal = screenWidth / 100;
    return percentInDecimal * percent;
}

export {
    viewHeightPercent,
    viewWidthPercent
};