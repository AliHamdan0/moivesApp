import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Platform } from "react-native";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles, theme } from "../theme";
import TrendingMovies from "../components/trendingMovies";
import { useEffect, useState } from "react";
import MoviesList from "../components/moviesList";
import useFetch from "../utilies/useFetch";
import {
  trendingMovies,
  upComingMovies,
  topRatedMovies,
} from "../utilies/apiConfig";

export const Home = ({ navigation }) => {
  const [getFetch] = useFetch();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [topRated, setTopRated] = useState([]);
  useEffect(() => {
    async function fetchTrendingMovies() {
      let res = await getFetch(trendingMovies);
      if (res) {
        setMovies(res?.data.results);
      }
    }
    async function fetchUpComingMovies() {
      let res = await getFetch(upComingMovies);
      if (res) {
        setUpComing(res?.data.results);
      }
    }
    async function fetchUpTopMovies() {
      let res = await getFetch(topRatedMovies);
      if (res) {
        setTopRated(res?.data.results);
      }
    }
    fetchTrendingMovies();
    fetchUpComingMovies();
    fetchUpTopMovies();
    setLoading(false);
  }, []);
  const os = Platform.OS;
  return (
    <View className="flex-1 bg-neutral-800 px-4">
      <StatusBar style="light" />
      <SafeAreaView className={os == "android" ? "mt-[40]" : ""}></SafeAreaView>
      <View className="justify-between items-center flex-row">
        <Bars3CenterLeftIcon strokeWidth={2} size="30" color="#fff" />
        <Text className="text-white text-3xl font-bold">
          <Text style={styles.text}>M</Text>ovies
        </Text>
        <Pressable onPress={() => navigation.navigate("Search")}>
          <MagnifyingGlassIcon width="30" color="#fff" strokeWidth={2} />
        </Pressable>
      </View>
      {loading ? (
        <View className="justify-center items-center flex-1">
          <ActivityIndicator
            animating={loading}
            size={100}
            color={theme.backgroundColor}
          />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {movies && <TrendingMovies data={movies} />}
          {upComing && <MoviesList data={upComing} title="Up coming" />}
          {topRated && <MoviesList data={topRated} title="Top rated" />}
        </ScrollView>
      )}
    </View>
  );
};
