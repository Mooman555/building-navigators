import * as React from "react";
import {
  View,
  Image,
  Pressable,
  ImageBackground,
  Dimensions,
  Text,
} from "react-native";
import { useFonts } from "expo-font";
// import Svg, { Circle, Path } from "react-native-svg";
// import baseStyles from "../UI/Styles";
// import Colors from "../UI/Colors";
// import { MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import {
  CommonActions,
  TabActions,
  DrawerActions,
  DefaultTheme,
} from "@react-navigation/native";
import Splash from "../Screens/Splash/Splash";
import OnBoarding from "../Screens/OnBoarding/OnBoarding";
import Home from "../Screens/Home/Home";
import Buildings from "../Screens/Buildings/Buildings";

const windowWidth = Dimensions.get("window").width;

const Stack = createStackNavigator();

export const MainStack = () => {
  const [loaded] = useFonts({
    AktivBlack: require("../../assets/fonts/AktivGrotesk-Black.ttf"),
    AktivBold: require("../../assets/fonts/AktivGrotesk-Bold.ttf"),
    AktivBlackItalic: require("../../assets/fonts/AktivGrotesk-BlackItalic.ttf"),
    AktivMedium: require("../../assets/fonts/AktivGrotesk-Medium.ttf"),
    AktivMediumItalic: require("../../assets/fonts/AktivGrotesk-MediumItalic.ttf"),
    AktivRegular: require("../../assets/fonts/AktivGrotesk-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const navTheme = DefaultTheme;
  navTheme.colors.background = "#F1F2F8";

  return (
    <Stack.Navigator initialRouteName="OnBoarding" backBehavior="initialRoute">
      {/* <Stack.Screen
        options={{
          headerShown: false,
          headerTransparent: true,
        }}
        name="Splash"
        component={Splash}
      /> */}
      <Stack.Screen
        options={{
          headerShown: false,
          headerTransparent: true,
        }}
        name="OnBoarding"
        component={OnBoarding}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerTransparent: true,
        }}
        name="Buildings"
        component={Buildings}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerTransparent: true,
        }}
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
  );
};
