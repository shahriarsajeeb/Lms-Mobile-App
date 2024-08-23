import { View, Text, Image } from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { styles } from "@/styles/home/banner.style";
import Swiper from "react-native-swiper";
import { bannerData } from "@/constants/constans";

export default function HomeBannerSlider() {
  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Swiper
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        autoplay={true}
        autoplayTimeout={5}
      >
        {bannerData.map((item: BannerDataTypes, index: number) => (
          <View key={index} style={styles.slide}>
            <Image
              source={item.bannerImageUrl!}
              style={{ width: 400, height: 250 }}
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
}
