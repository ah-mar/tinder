import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth, { AuthProvider } from "./hooks/useAuth";
import ChatScreen from "./screens/ChatScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MatchScreen from "./screens/MatchScreen";
import MessageScreen from "./screens/MessageScreen";
import ModalScreen from "./screens/ModalScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user1 } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user1 ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Message" component={MessageScreen} />
          <Stack.Screen
            name="Match"
            component={MatchScreen}
            options={{ presentation: "transparentModal" }}
          />
          <Stack.Screen
            name="Modal"
            component={ModalScreen}
            options={{ presentation: "modal" }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};
export default StackNavigator;
