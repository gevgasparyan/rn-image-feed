import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const scaleFont = (size: number) => moderateScale(size);

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;
const screenSize = Math.sqrt(width * height) / 100;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

export { moderateScale, scale, screenSize, verticalScale };
