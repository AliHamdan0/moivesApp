import { View, Text, Image, Pressable } from "react-native";
import Carousel from "react-native-snap-carousel";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image_URL } from "@env";
export default function TrendingMovies({ data }) {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Movie", { item });
  };
  return (
    <View className="my-4 mb-5">
      <Text className="text-xl mb-4 text-white">Trending Movies</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => <MovieCard item={item} />}
        sliderWidth={width}
        itemWidth={width * 0.6}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );

  function MovieCard({ item }) {
    const placeholder =
      "https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png?fit=1200%2C800&ssl=1";
    return (
      <Pressable onPress={() => handleClick(item)}>
        <Image
          source={{
            uri: item?.poster_path
              ? `${Image_URL}/w500${item?.poster_path}`
              : placeholder,
          }}
          style={{ width: width * 0.6, height: height * 0.4 }}
          className="rounded-3xl"
        />
      </Pressable>
    );
  }
}
