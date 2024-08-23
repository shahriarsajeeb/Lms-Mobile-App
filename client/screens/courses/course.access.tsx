import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Loader from "@/components/loader/loader";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";
import { widthPercentageToDP } from "react-native-responsive-screen";
import QuestionsCard from "@/components/cards/question.card";
import { Toast } from "react-native-toast-notifications";
import ReviewCard from "@/components/cards/review.card";
import { FontAwesome } from "@expo/vector-icons";
import useUser from "@/hooks/auth/useUser";

export default function CourseAccessScreen() {
  const [isLoading, setisLoading] = useState(true);
  const { user } = useUser();
  const { courseData } = useLocalSearchParams();
  const data: CoursesType = JSON.parse(courseData as string);

  const [courseContentData, setcourseContentData] = useState<CourseDataType[]>(
    []
  );
  const [activeVideo, setActiveVideo] = useState(0);
  const [activeButton, setActiveButton] = useState("About");
  const [isExpanded, setIsExpanded] = useState(false);
  const [quesion, setQuesion] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [reviewAvailabe, setreviewAvailabe] = useState(false);

  useEffect(() => {
    const subscription = async () => {
      await fetchCourseContent();
      const isReviewAvailble = data?.reviews?.find(
        (i: any) => i.user._id === user?._id
      );
      if (isReviewAvailble) {
        setreviewAvailabe(true);
      }
    };
    subscription();
  }, []);

  const fetchCourseContent = async () => {
    const accessToken = await AsyncStorage.getItem("access_token");
    const refreshToken = await AsyncStorage.getItem("refresh_token");
    await axios
      .get(`${SERVER_URI}/get-course-content/${data._id}`, {
        headers: {
          "access-token": accessToken,
          "refresh-token": refreshToken,
        },
      })
      .then((res: any) => {
        setisLoading(false);
        setcourseContentData(res.data.content);
      })
      .catch((error) => {
        setisLoading(false);
        router.push("/(routes)/course-details");
      });
  };

  const handleQuestionSubmit = async () => {
    const accessToken = await AsyncStorage.getItem("access_token");
    const refreshToken = await AsyncStorage.getItem("refresh_token");

    await axios
      .put(
        `${SERVER_URI}/add-question`,
        {
          question: quesion,
          courseId: data?._id,
          contentId: courseContentData[activeVideo]._id,
        },
        {
          headers: {
            "access-token": accessToken,
            "refresh-token": refreshToken,
          },
        }
      )
      .then((res) => {
        setQuesion("");
        Toast.show("Question created successfully!", {
          placement: "bottom",
        });
        fetchCourseContent();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReviewSubmit = async () => {
    const accessToken = await AsyncStorage.getItem("access_token");
    const refreshToken = await AsyncStorage.getItem("refresh_token");

    await axios
      .put(
        `${SERVER_URI}/add-review/${data?._id}`,
        {
          review,
          rating,
        },
        {
          headers: {
            "access-token": accessToken,
            "refresh-token": refreshToken,
          },
        }
      )
      .then((res) => {
        setRating(1);
        setReview("");
        router.push({
          pathname: "/(routes)/course-details",
          params: { item: JSON.stringify(data) },
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const renderStars = () => {
    const starts = [];
    for (let i = 1; i <= 5; i++) {
      starts.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <FontAwesome
            name={i <= rating ? "star" : "star-o"}
            size={25}
            color={"#FF8D07"}
            style={{ marginHorizontal: 4, marginTop: -5 }}
          />
        </TouchableOpacity>
      );
    }
    return starts;
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView stickyHeaderIndices={[0]} style={{ flex: 1, padding: 10 }}>
          <View
            style={{ width: "100%", aspectRatio: 16 / 9, borderRadius: 10 }}
          >
            <WebView
              source={{ uri: courseContentData[activeVideo]?.videoUrl! }}
              allowsFullscreenVideo={true}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.button}
              disabled={activeVideo === 0}
              onPress={() => setActiveVideo(activeVideo - 1)}
            >
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
                Prev
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setActiveVideo(activeVideo + 1)}
            >
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {activeVideo + 1}. {courseContentData[activeVideo]?.title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 25,
              marginHorizontal: 10,
              backgroundColor: "#E1E9F8",
              borderRadius: 50,
              gap: 10,
            }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 42,
                backgroundColor:
                  activeButton === "About" ? "#2467EC" : "transparent",
                borderRadius: activeButton === "About" ? 50 : 0,
              }}
              onPress={() => setActiveButton("About")}
            >
              <Text
                style={{
                  color: activeButton === "About" ? "#fff" : "#000",
                  fontFamily: "Nunito_600SemiBold",
                }}
              >
                About
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 42,
                backgroundColor:
                  activeButton === "Q&A" ? "#2467EC" : "transparent",
                borderRadius: activeButton === "Q&A" ? 50 : 0,
              }}
              onPress={() => setActiveButton("Q&A")}
            >
              <Text
                style={{
                  color: activeButton === "Q&A" ? "#fff" : "#000",
                  fontFamily: "Nunito_600SemiBold",
                }}
              >
                Q&A
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 42,
                backgroundColor:
                  activeButton === "Reviews" ? "#2467EC" : "transparent",
                borderRadius: activeButton === "Reviews" ? 50 : 0,
              }}
              onPress={() => setActiveButton("Reviews")}
            >
              <Text
                style={{
                  color: activeButton === "Reviews" ? "#fff" : "#000",
                  fontFamily: "Nunito_600SemiBold",
                }}
              >
                Reviews
              </Text>
            </TouchableOpacity>
          </View>

          {activeButton === "About" && (
            <View
              style={{
                marginHorizontal: 16,
                marginVertical: 25,
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ fontSize: 18, fontFamily: "Raleway_700Bold" }}>
                About course
              </Text>
              <Text
                style={{
                  color: "#525258",
                  fontSize: 16,
                  marginTop: 10,
                  textAlign: "justify",
                  fontFamily: "Nunito_500Medium",
                }}
              >
                {isExpanded
                  ? data?.description
                  : data?.description.slice(0, 302)}
              </Text>
              {data?.description.length > 302 && (
                <TouchableOpacity
                  style={{ marginTop: 3 }}
                  onPress={() => setIsExpanded(!isExpanded)}
                >
                  <Text
                    style={{
                      color: "#2467EC",
                      fontSize: 14,
                    }}
                  >
                    {isExpanded ? "Show Less" : "Show More"}
                    {isExpanded ? "-" : "+"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          {activeButton === "Q&A" && (
            <View style={{ flex: 1, margin: 15 }}>
              <View>
                <TextInput
                  value={quesion}
                  onChangeText={setQuesion}
                  placeholder="Ask a question..."
                  style={{
                    marginVertical: 20,
                    flex: 1,
                    textAlignVertical: "top",
                    justifyContent: "flex-start",
                    backgroundColor: "white",
                    borderRadius: 10,
                    height: 100,
                    padding: 10,
                  }}
                  multiline={true}
                />
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <TouchableOpacity
                    style={[styles.button]}
                    disabled={quesion === ""}
                    onPress={() => handleQuestionSubmit()}
                  >
                    <Text
                      style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}
                    >
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginBottom: 20 }}>
                {courseContentData[activeVideo]?.questions
                  ?.slice()
                  .reverse()
                  .map((item: CommentType, index: number) => (
                    <QuestionsCard
                      item={item}
                      key={index}
                      fetchCourseContent={fetchCourseContent}
                      courseData={data}
                      contentId={courseContentData[activeVideo]._id}
                    />
                  ))}
              </View>
            </View>
          )}
          {activeButton === "Reviews" && (
            <View style={{ marginHorizontal: 16, marginVertical: 25 }}>
              {!reviewAvailabe && (
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 18,
                        paddingBottom: 10,
                        paddingLeft: 2,
                        paddingRight: 5,
                      }}
                    >
                      Give one rating:
                    </Text>
                    {renderStars()}
                  </View>

                  <TextInput
                    value={review}
                    onChangeText={setReview}
                    placeholder="Give one review..."
                    style={{
                      flex: 1,
                      textAlignVertical: "top",
                      justifyContent: "flex-start",
                      backgroundColor: "white",
                      borderRadius: 10,
                      height: 100,
                      padding: 10,
                    }}
                    multiline={true}
                  />
                  <View
                    style={{ flexDirection: "row", justifyContent: "flex-end" }}
                  >
                    <TouchableOpacity
                      style={[styles.button]}
                      disabled={review === ""}
                      onPress={() => handleReviewSubmit()}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 18,
                          fontWeight: "600",
                        }}
                      >
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <View style={{ rowGap: 25 }}>
                {data?.reviews?.map((item: ReviewType, index: number) => (
                  <ReviewCard item={item} key={index} />
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: widthPercentageToDP("35%"),
    height: 40,
    backgroundColor: "#2467EC",
    marginVertical: 10,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
