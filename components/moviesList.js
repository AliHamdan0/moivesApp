import { View, Text, FlatList, Image, Pressable } from "react-native";
import React from "react";
import { styles } from "../theme";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image_URL } from "@env";

export default function MoviesList({ title, data, showSeeAll = true }) {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <View className="my-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-white text-xl mb-4">{title}</Text>
        {showSeeAll && (
          <Pressable onPress={() => ""}>
            <Text style={styles.text} className="text-xl mb-4">
              See all
            </Text>
          </Pressable>
        )}
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <MenuItem item={item} />}
        horizontal
      />
    </View>
  );
  function MenuItem({ item }) {
    const placeholder =
      "https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png?fit=1200%2C800&ssl=1";

    return (
      <Pressable onPress={() => navigation.navigate("Movie", { item })}>
        <View className="space-y-1 mr-2">
          <Image
            source={{
              uri: item.poster_path
                ? `${Image_URL}/w185${item.poster_path}`
                : placeholder,
            }}
            alt=""
            style={{ width: width * 0.33, height: height * 0.22 }}
            className="rounded-3xl"
          />
          <Text className="text-neutral-400 mt-1 text-center">
            {item?.title?.length > 14
              ? item.title.slice(0, 14) + "..."
              : item.title}
          </Text>
        </View>
      </Pressable>
    );
  }
}
