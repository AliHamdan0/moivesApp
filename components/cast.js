import { View, Text, FlatList, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image_URL } from "@env";

export default function Cast({ title, data }) {
  const navigation = useNavigation();
  const placeholder =
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";
  return (
    <View>
      <Text className="text-white font-semibold text-xl mb-2">{title}</Text>
      <FlatList
        horizontal
        data={data}
        ItemSeparatorComponent={() => (
          <View style={{ width: 20, height: 20 }}></View>
        )}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate("Actor", { item })}>
            <View className="rounded-full w-20 h-20 overflow-hidden">
              <Image
                source={{
                  uri: item?.profile_path
                    ? `${Image_URL}/w185${item?.profile_path}`
                    : placeholder,
                }}
                className="rounded-2xl w-20 h-24"
              />
            </View>
            <Text className="text-neutral-400 text-xs mt-1 text-center">
              {item.original_name.length > 12
                ? item.original_name.slice(0, 10)
                : item.original_name}
            </Text>
            <Text className="text-neutral-400 text-xs mt-1 text-center">
              {item.character.length > 12
                ? item.character.slice(0, 10)
                : item.character}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
