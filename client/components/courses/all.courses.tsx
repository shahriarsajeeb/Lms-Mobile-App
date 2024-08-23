import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import {
  useFonts,
  Raleway_700Bold,
  Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";
import {
  Nunito_600SemiBold,
  Nunito_500Medium,
} from "@expo-google-fonts/nunito";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import CourseCard from "@/components/cards/course.card";

export default function AllCourses() {
  const [courses, setCourses] = useState<CoursesType[]>([]);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${SERVER_URI}/get-courses`)
      .then((res: any) => {
        setCourses(res.data.courses);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_600SemiBold,
    Raleway_600SemiBold,
    Nunito_500Medium,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={{ flex: 1, marginHorizontal: 16 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000000",
            fontFamily: "Raleway_700Bold",
          }}
        >
          Popular courses
        </Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/courses")}>
          <Text
            style={{
              fontSize: 15,
              color: "#2467EC",
              fontFamily: "Nunito_600SemiBold",
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={courses}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <CourseCard item={item} />}
      />
    </View>
  );
}
