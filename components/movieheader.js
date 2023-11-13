import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, View, SafeAreaView, Platform } from "react-native";
import { styles, theme } from "../theme";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Movieheader() {
  const [isFav, setIsFav] = useState(false);
  const navigation = useNavigation();
  const os = Platform.OS;
  return (
    <View className="w-full">
      <SafeAreaView
        className={`w-full z-10 absolute flex-row justify-between items-center px-4 ${
          os == "ios" ? "" : "mt-[30]"
        }`}
      >
        <View style={styles.backgroundColor} className="p-2 px-3 rounded-md">
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesome5 name="chevron-left" size={24} color="white" />
          </Pressable>
        </View>
        <Pressable onPress={() => setIsFav(!isFav)}>
          <MaterialIcons
            name="favorite"
            size={32}
            color={isFav ? theme.backgroundColor : "white"}
          />
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
