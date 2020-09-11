import { Platform, StatusBar, Dimensions, PixelRatio } from "react-native";
import { theme } from "galio-framework";
const { width, height } = Dimensions.get("window");
const font2dp = (fontPer) => {
  const elemWidth = typeof fontPer === "number" ? fontPer : parseFloat(fontPer);
  const Newfont2dp = Platform.OS === "ios" ? elemWidth - 0.3 : elemWidth;
  return PixelRatio.roundToNearestPixel((width * Newfont2dp) / 100);
};
export const StatusHeight = Platform.OS === "ios" ? 0 : StatusBar.currentHeight;
export const HeaderHeight = theme.SIZES.BASE * 3.5 + (StatusHeight || 0);
export const iPhoneX = () =>
  Platform.OS === "ios" && (height >= 812 || width >= 812);
export default {
  StatusHeight,
  HeaderHeight,
  iPhoneX,
  font2dp,
};
