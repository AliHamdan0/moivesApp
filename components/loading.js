import { View, Text, ActivityIndicator } from "react-native";

export default function Loading() {
  return (
    <View>
      <ActivityIndicator animating={true} />
    </View>
  );
}
