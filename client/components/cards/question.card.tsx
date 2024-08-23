import { SERVER_URI } from "@/utils/uri";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default function QuestionsCard({
  item,
  fetchCourseContent,
  courseData,
  contentId,
}: {
  item: CommentType;
  fetchCourseContent: () => void;
  courseData: CoursesType;
  contentId: string;
}) {
  const [open, setOpen] = useState(false);
  const [reply, setReply] = useState("");
  const [showReplies, setshowReplies] = useState(false);

  const handleReplySubmit = async () => {
    const accessToken = await AsyncStorage.getItem("access_token");
    const refreshToken = await AsyncStorage.getItem("refresh_token");

    await axios
      .put(
        `${SERVER_URI}/add-answer`,
        {
          answer: reply,
          courseId: courseData?._id,
          contentId: contentId,
          questionId: item?._id,
        },
        {
          headers: {
            "access-token": accessToken,
            "refresh-token": refreshToken,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setReply("");
        setOpen(!open);
        fetchCourseContent();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <View style={{ flexDirection: "row", paddingVertical: 10 }}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 100 }}
          source={{
            uri:
              item.user?.avatar?.url ||
              "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png",
          }}
        />
        <View style={{ marginHorizontal: 8, flex: 1 }}>
          <View style={{ flex: 1, justifyContent: "space-around" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View>
                <Text style={{ fontSize: 18, fontFamily: "Raleway_700Bold" }}>
                  {item.user.name}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    paddingVertical: 5,
                    paddingHorizontal: 3,
                  }}
                >
                  {item.question}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {item?.questionReplies.length === 0 ? (
        <TouchableOpacity onPress={() => setOpen(!open)}>
          <Text style={{ fontSize: 18, paddingLeft: 15, paddingBottom: 10 }}>
            Add Reply
          </Text>
        </TouchableOpacity>
      ) : (
        <View>
          <TouchableOpacity onPress={() => setshowReplies(!showReplies)}>
            <Text style={{ fontSize: 18, paddingLeft: 15, paddingBottom: 10 }}>
              {!showReplies ? "Show" : "Hide"} Replies
            </Text>
          </TouchableOpacity>
          {showReplies && (
            <>
              {item?.questionReplies?.map((reply: any, index: number) => (
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                  }}
                  key={index}
                >
                  <Image
                    style={{ width: 50, height: 50, borderRadius: 100 }}
                    source={{
                      uri:
                        reply.user?.avatar?.url ||
                        "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png",
                    }}
                  />
                  <View style={{ marginHorizontal: 8, flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: "space-around" }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <View>
                          <Text
                            style={{
                              fontSize: 18,
                              fontFamily: "Raleway_700Bold",
                            }}
                          >
                            {reply.user.name}
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              paddingVertical: 5,
                              paddingHorizontal: 3,
                            }}
                          >
                            {reply?.answer}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
              <TouchableOpacity onPress={() => setOpen(!open)}>
                <Text
                  style={{ fontSize: 18, paddingLeft: 15, paddingBottom: 10 }}
                >
                  Add Reply
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

      <Modal animationType="slide" visible={open}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 15,
            backgroundColor: "#9BA8B2",
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity onPress={() => setOpen(!open)}>
              <Ionicons name="close-outline" size={25} />
            </TouchableOpacity>
          </View>
          <TextInput
            value={reply}
            onChangeText={setReply}
            placeholder="Add your reply..."
            style={{
              marginVertical: 20,
              textAlignVertical: "top",
              justifyContent: "flex-start",
              backgroundColor: "#fff",
              borderRadius: 10,
              height: 100,
              padding: 10,
            }}
            multiline={true}
          />
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={[styles.button]}
              disabled={reply === ""}
              onPress={() => handleReplySubmit()}
            >
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
