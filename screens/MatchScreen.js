import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";

const MatchScreen = () => {
  const navigator = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  return (
    <View className="h-full bg-red-500 pt-20 opacity-90">
      <View className="justify-center px-10 pt-20">
        <Image
          className="h-20 w-full"
          source={{
            uri: "https://e9digital.com/love-at-first-website/images/its-a-match.png",
          }}
        />
      </View>
      <Text className="text-white text-center mt-5">
        You and {userSwiped.displayName} have liked each other.
      </Text>

      <View className="flex-row justify-evenly mt-5">
        <Image
          className="h-32 w-32 rounded-full"
          source={{
            uri: loggedInProfile.photoUrl,
          }}
        />
        <Image
          className="h-32 w-32 rounded-full"
          source={{
            uri: userSwiped.photoUrl,
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigator.goBack();
          navigator.navigate("Chat");
        }}
        className="bg-white m-5 px-10 py-8 rounded-full mt-28"
      >
        <Text className="text-center">Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};
export default MatchScreen;
