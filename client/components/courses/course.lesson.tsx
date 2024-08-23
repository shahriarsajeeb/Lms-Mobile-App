import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";

export default function CourseLesson({
  courseDetails,
}: {
  courseDetails: CoursesType;
}) {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  const videoSections: string[] = [
    ...new Set<string>(
      courseDetails.courseData.map((item: CourseDataType) => item.videoSection)
    ),
  ];

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  return (
    <View style={{ flex: 1, rowGap: 10, marginBottom: 10 }}>
      <View
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: "#E1E2E5",
          borderRadius: 8,
        }}
      >
        <View>
          {videoSections.map((item: string, index: number) => {
            const isSectionVisible = visibleSections.has(item);

            // Filter videos by section
            const sectionVideos: any[] = courseDetails?.courseData?.filter(
              (i: any) => i.videoSection === item
            );

            return (
              <>
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 10,
                    borderBottomColor: "#DCDCDC",
                    borderBottomWidth:
                      index === videoSections.length - 1 ? 0 : 1,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontFamily: "Raleway_600SemiBold" }}
                  >
                    {item}
                  </Text>
                  {isSectionVisible ? (
                    <TouchableOpacity onPress={() => toggleSection(item)}>
                      <Entypo name="chevron-up" size={23} color={"#6707FE"} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => toggleSection(item)}>
                      <Entypo name="chevron-down" size={23} color={"#6707FE"} />
                    </TouchableOpacity>
                  )}
                </View>
                {isSectionVisible && (
                  <>
                    {sectionVideos.map(
                      (item: CourseDataType, index: number) => (
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: "#E1E2E5",
                            borderRadius: 8,
                          }}
                        >
                          <View style={styles.itemContainer}>
                            <View style={styles.itemContainerWrapper}>
                              <View style={styles.itemTitleWrapper}>
                                <Feather
                                  name="video"
                                  size={20}
                                  color={"#8a8a8a"}
                                />
                                <Text
                                  style={[
                                    styles.itemTitleText,
                                    { fontFamily: "Nunito_500Medium" },
                                  ]}
                                >
                                  {item.title}
                                </Text>
                              </View>
                              <View style={styles.itemDataContainer}>
                                <Text
                                  style={{
                                    marginRight: 6,
                                    color: "#818181",
                                    fontFamily: "Nunito_400Regular",
                                  }}
                                >
                                  {item.videoLength}{" "}
                                  {item?.videoLength > 60 ? "hour" : "minutes"}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      )
                    )}
                  </>
                )}
              </>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#E1E2E5",
    marginHorizontal: 10,
    paddingVertical: 12,
  },
  itemContainerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemTitleText: { marginLeft: 8, color: "#525258", fontSize: 16 },
  itemDataContainer: { flexDirection: "row", alignItems: "center" },
});
