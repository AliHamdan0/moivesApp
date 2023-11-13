import { useEffect, useState } from "react";
import {
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Movieheader from "../components/movieheader";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MoviesList from "../components/moviesList";
import useFetch from "../utilies/useFetch";
import {
  movieDetails,
  movieCredential,
  movieSimilar,
} from "../utilies/apiConfig";
import { theme } from "../theme";
import { Image_URL } from "@env";

export function Movie({ route }) {
  const { item } = route.params;
  const [getFetch] = useFetch();
  const [movieData, setMovieData] = useState();
  const [loading, setLoading] = useState(true);
  const [movieCredit, setMovieCredit] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  useEffect(() => {
    async function fetchMovieData() {
      let res = await getFetch(movieDetails(item.id));
      if (res) {
        setMovieData(res.data);
      }
    }
    async function fetchMovieCredential() {
      let res = await getFetch(movieCredential(item.id));
      if (res) {
        setMovieCredit(res.data.cast);
      }
    }
    async function fetchMovieSimilar() {
      let res = await getFetch(movieSimilar(item.id));
      if (res) {
        setSimilarMovies(res.data.results);
      }
    }
    fetchMovieData();
    fetchMovieCredential();
    fetchMovieSimilar();
    setLoading(false);
  }, [item]);
  const { width, height } = useWindowDimensions();

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Movieheader />
      {loading ? (
        <View className="justify-center items-center flex-1">
          <ActivityIndicator
            animating={loading}
            size={100}
            color={theme.backgroundColor}
          />
        </View>
      ) : (
        <View>
          <View>
            <Image
              source={{ uri: `${Image_URL}/w500${movieData?.poster_path}` }}
              alt=""
              style={{ width: width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8),rgba(23,23,23,1)"]}
              style={{ width: width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
          <View style={{ marginTop: -height * 0.04 }} className="space-y-3">
            <Text className="text-4xl font-bold text-white tracking-wide text-center">
              {movieData?.title}
            </Text>

            <Text className="text-neutral-400 text-center text-base font-semibold">
              {movieData?.status} . {movieData?.release_date?.split("-")[0]} .{" "}
              {movieData?.runtime} min
            </Text>
            <View className="flex-row justify-center space-x-2">
              {movieData?.genres.map((genre, index) => (
                <Text
                  key={genre.name}
                  className="text-neutral-400 text-center text-base font-semibold"
                >
                  {genre.name} {index < movieData.genres.length - 1 ? "." : ""}
                </Text>
              ))}
            </View>

            <Text className="tracking-wide text-neutral-400 mx-4">
              {movieData?.overview}
            </Text>
            <View className="mx-4">
              {movieCredit.length > 0 && (
                <Cast data={movieCredit} title="Top cast:" />
              )}
              {similarMovies.length > 0 && (
                <MoviesList
                  data={similarMovies}
                  title="Similar Movies"
                  showSeeAll={false}
                />
              )}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
