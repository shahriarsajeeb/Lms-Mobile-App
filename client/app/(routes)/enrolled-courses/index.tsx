import CourseCard from "@/components/cards/course.card";
import Loader from "@/components/loader/loader";
import useUser from "@/hooks/auth/useUser";
import { SERVER_URI } from "@/utils/uri";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

export default function index() {
  const [courses, setcourses] = useState<CoursesType[]>([]);
  const [loader, setLoader] = useState(false);
  const { loading, user } = useUser();

  useEffect(() => {
    axios.get(`${SERVER_URI}/get-courses`).then((res: any) => {
      const courses: CoursesType[] = res.data.courses;
      const data = courses.filter((i: CoursesType) =>
        user?.courses?.some((d: any) => d._id === i._id)
      );
      setcourses(data);
    });
  }, [loader, user]);

  return (
    <>
      {loader || loading ? (
        <Loader />
      ) : (
        <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={{ flex: 1 }}>
          <FlatList
            data={courses}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => <CourseCard item={item} />}
          />
        </LinearGradient>
      )}
    </>
  );
}
