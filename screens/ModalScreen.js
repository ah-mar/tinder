import { useNavigation } from "@react-navigation/native";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";

const ModalScreen = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [occupation, setOccupation] = useState("");
  const [age, setAge] = useState();
  const navigator = useNavigation();
  const { user1 } = useAuth();

  const isDisable = !imageUrl || !age || !occupation;

  function updateUserProfile() {
    setDoc(doc(db, "users", user1.uid), {
      id: user1.uid,
      displayName: user1.displayName,
      photoUrl: imageUrl,
      occupation: occupation,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => navigator.navigate("Home"))
      .catch((error) => console.error(error));
  }

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1 justify-between items-center"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="items-center">
          <Image
            className="h-20 w-80"
            source={{ uri: "https://links.papareact.com/2pf" }}
            resizeMode="contain"
          />
          <Text className="text-xl text-gray-500 p-2 font-bold -mt-4">
            Welcome {user1.displayName}
          </Text>
        </View>

        <View className="">
          <Text className="text-center text-red-400 p-2 font-bold">
            Step 1: Enter your profile pic URL
          </Text>

          <TextInput
            className="border border-gray-400 rounded-md p-4 w-80"
            onChangeText={setImageUrl}
            value={imageUrl}
            placeholder="https://www.your-site.com/profile-pic.jpg"
          />
        </View>

        <View className="">
          <Text className="text-center text-red-400 p-2 font-bold">
            Step 2: Enter your occupation
          </Text>

          <TextInput
            className="border border-gray-400 rounded-md p-4 w-80"
            onChangeText={setOccupation}
            value={occupation}
            placeholder="Plumber"
          />
        </View>

        <View className="">
          <Text className="text-center text-red-400 p-2 font-bold">
            Step 3: Enter your age
          </Text>

          <TextInput
            className="border border-gray-400 rounded-md p-4 w-80"
            onChangeText={setAge}
            value={age}
            placeholder="28"
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity
          onPress={updateUserProfile}
          disabled={isDisable}
          className={`w-64 p-3 rounded-xl bg-red-400 ${
            isDisable && "bg-gray-400"
          }`}
        >
          <Text className="text-white text-center text-xl">Update Profile</Text>
        </TouchableOpacity>

        <Button
          className="mt-4"
          title="Go Back"
          onPress={() => navigator.goBack()}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default ModalScreen;

//require("../assets/tinder_Logo_Name.webp")
