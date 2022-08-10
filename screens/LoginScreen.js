import { useEffect } from "react";
import { Text, ImageBackground, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../firebase";

//Possibly completes an authentication session on web in a window popup.
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "199284897821-e8qj69s2fj8e8lau23th5c7692cgkbju.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      //const provider = new GoogleAuthProvider();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((data) => console.log("Sign in successfull"))
        .catch((error) => console.log(error));
    }
  }, [response]);

  return (
    <SafeAreaView className="flex-1 justify-center">
      <ImageBackground
        source={{
          uri: "https://tinder.com/static/tinder.png",
        }}
        resizeMode="cover"
        className="flex-1 justify-center"
      >
        <TouchableOpacity
          disabled={!request}
          onPress={() => promptAsync()}
          className="absolute bottom-40 right-[25%] w-52 bg-white p-4 rounded-2xl"
        >
          <Text className=" text-center text-gray-700  text-xl">Sign In</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default LoginScreen;

// Get request, response and promptAsync function from expo auth.Initially request is prepared but response is null, so useEffect is conditionally not run. After promptasync, the page is redirected to with response and component renders again. This time useEffect condiition is true. If response is success, get token from response. Create credential with firebase method G-Provider.credential. Then Sign in with credential.
