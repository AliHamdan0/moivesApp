import {
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Platform,
  Pressable,
  Text,
  Image,
  useWindowDimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";
import { searchApi } from "../utilies/apiConfig";
import useFetch from "../utilies/useFetch";
import debounce from "lodash.debounce";
import { Image_URL } from "@env";

export default function Search({ navigation }) {
  const os = Platform.OS;
  const { width, height } = useWindowDimensions();
  const [movie, setMovie] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [getFetch] = useFetch();
  async function handleSearch(value) {
    if (value && value.length > 2) {
      setLoading(true);
      const res = await getFetch(searchApi(value));
      if (res) {
        setResult(res.data.results);
      }
      setLoading(false);
    } else {
      setLoading(false);
      setResult([]);
    }
  }
  const handleTextdebounce = useCallback(debounce(handleSearch, 400), []);
  const placeholder =
    "https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png?fit=1200%2C800&ssl=1";

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      className="px-4 bg-neutral-900 flex-1"
    >
      <SafeAreaView className={`${os == "ios" ? "" : "mt-[50]"}`}>
        <View className="flex-row h-14 items-center border rounded-3xl border-neutral-500 px-3 py-4">
          <TextInput
            onChangeText={handleTextdebounce}
            className=" text-white text-base font-semibold flex-1 "
            placeholder="Type here"
            placeholderTextColor="white"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Pressable
            onPress={() => navigation.navigate("Home")}
            className="bg-neutral-500 rounded-full h-9 w-9 justify-center items-center"
          >
            <Ionicons name="close-outline" size={24} color="white" />
          </Pressable>
        </View>
      </SafeAreaView>
      <ScrollView
        contentContainerStyle={{ padding: 15, flex: 1 }}
        showsVerticalScrollIndicator={false}
        className="space-y-3 flex-1"
      >
        <Text className="font-semibold text-white text-xl mb-1">
          Result ({result.length})
        </Text>
        {loading ? (
          <View className="justify-center items-center flex-1">
            <ActivityIndicator
              animating={loading}
              size={100}
              color={theme.backgroundColor}
            />
          </View>
        ) : (
          <View className="grow">
            <FlatList
              data={result}
              numColumns={2}
              columnWrapperStyle={{ gap: 16 }}
              ListEmptyComponent={() => (
                <View className="h-[50vh] justify-center items-center">
                  <Text className="text-white text-2xl">No Data</Text>
                </View>
              )}
              ItemSeparatorComponent={() => <View className="w-5 h-5"></View>}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => navigation.navigate("Movie", { item })}
                >
                  <View>
                    <Image
                      className="rounded-3xl"
                      source={{
                        uri: item?.poster_path
                          ? `${Image_URL}/w185${item?.poster_path}`
                          : placeholder,
                      }}
                      alt=""
                      style={{
                        width: width * 0.4,
                        height: height * 0.3,
                      }}
                    />
                    <Text className="text-neutral-400 text-lg text-center mt-2">
                      {item.title?.length > 10
                        ? `${item.title?.slice(0, 10)}...`
                        : item.title}
                    </Text>
                  </View>
                </Pressable>
              )}
            />
          </View>
        )}
      </ScrollView>
    </ScrollView>
  );
}
