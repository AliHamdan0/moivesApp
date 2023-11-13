import {
  View,
  SafeAreaView,
  Text,
  useWindowDimensions,
  Platform,
  Pressable,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { Image_URL } from "@env";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { styles, theme } from "../theme";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MoviesList from "../components/moviesList";
import useFetch from "../utilies/useFetch";
import { person, personMovies } from "../utilies/apiConfig";

export default function Actor({ route }) {
  const { width, height } = useWindowDimensions();
  const [getFetch] = useFetch();
  const [actorData, setActorData] = useState({});
  const item = route.params?.item;
  const placeholder =
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";
  const os = Platform.OS;
  const navigation = useNavigation();
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [castMovies, setCastMovies] = useState([]);

  useEffect(() => {
    const getPersonData = async () => {
      const res = await getFetch(person(item.id));
      if (res) {
        setActorData(res.data);
      }
    };
    const getPersonMoviesData = async () => {
      const res = await getFetch(personMovies(item.id));
      if (res) {
        setCastMovies(res.data?.cast);
      }
    };
    personMovies;
    getPersonData();
    getPersonMoviesData();
    setLoading(false);
  }, [item]);
  if (loading) {
    return (
      <View className="justify-center items-center flex-1">
        <ActivityIndicator
          animating={loading}
          size={100}
          color={theme.backgroundColor}
        />
      </View>
    );
  }
  return (
    <ScrollView className="bg-neutral-900 flex-1">
      <SafeAreaView
        className={`w-full z-10 flex-row justify-between items-center px-4 ${
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
            color={isFav ? "red" : "white"}
          />
        </Pressable>
      </SafeAreaView>
      <View
        style={{
          shadowColor: "gray",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 40,
          elevation: 10,
        }}
      >
        <View className="w-72 h-72 rounded-full overflow-hidden border-2 border-neutral-500 m-auto mt-5">
          <Image
            source={{
              uri: actorData?.profile_path
                ? `${Image_URL}/w342${actorData?.profile_path}`
                : placeholder,
            }}
            className="rounded-2xl w-[100%] h-[100%]"
            alt=""
          />
        </View>
      </View>
      <View>
        <Text className="text-white text-3xl mt-2 text-center font-bold">
          {actorData.name}
        </Text>
        <Text className="text-neutral-500 text-lg mt-1 text-center">
          {actorData.place_of_birth}
        </Text>
      </View>
      <View className="my-3 mx-3 bg-neutral-600 rounded-3xl px-5 py-2 flex flex-row justify-center items-start">
        <View className="border-r-2 border-neutral-500 px-2 flex items-center justify-center">
          <Text className="text-white text-lg ">Gender</Text>
          <Text className="text-sm text-neutral-400">
            {actorData.gender == 1 ? "Female" : "Male"}
          </Text>
        </View>
        <View className="border-r-2 border-neutral-500 px-2 flex items-center justify-center">
          <Text className="text-white text-lg ">Birthday</Text>
          <Text className="text-sm text-neutral-400">{actorData.birthday}</Text>
        </View>
        <View className="border-r-2 border-neutral-500 px-2 flex items-center justify-center">
          <Text className="text-white text-lg ">Knowing</Text>
          <Text className="text-sm text-neutral-400">
            {actorData.known_for_department}
          </Text>
        </View>
        <View className="px-2 flex items-center justify-center">
          <Text className="text-white text-lg ">Popularity</Text>
          <Text className="text-sm text-neutral-400">
            {actorData?.popularity?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View className="mx-4 mt-3">
        <Text className="text-xl text-white mb-2">Biography</Text>
        <Text className="text-neutral-400 text-lg">{actorData.biography}</Text>
      </View>
      <View className="mx-4 mt-3 mb-5">
        <MoviesList data={castMovies} title="Movies :" showSeeAll={false} />
      </View>
    </ScrollView>
  );
}
