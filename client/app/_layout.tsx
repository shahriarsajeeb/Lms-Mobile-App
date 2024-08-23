import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import { LogBox } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  }, []);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ToastProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(routes)/welcome-intro/index" />
        <Stack.Screen name="(routes)/login/index" />
        <Stack.Screen name="(routes)/sign-up/index" />
        <Stack.Screen name="(routes)/forgot-password/index" />
        <Stack.Screen
          name="(routes)/course-details/index"
          options={{
            headerShown: true,
            title: "Course Details",
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="(routes)/cart/index"
          options={{
            headerShown: true,
            title: "Cart Items",
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="(routes)/profile-details/index"
          options={{
            headerShown: true,
            title: "Profile Details",
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="(routes)/course-access/index"
          options={{
            headerShown: true,
            title: "Course Lessons",
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="(routes)/enrolled-courses/index"
          options={{
            headerShown: true,
            title: "Enrolled Courses",
            headerBackTitle: "Back",
          }}
        />
      </Stack>
    </ToastProvider>
  );
}
