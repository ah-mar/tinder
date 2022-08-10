import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TailwindProvider } from "tailwindcss-react-native";
import { AuthProvider } from "./hooks/useAuth";
import StackNavigator from "./StackNavigator";

export default function App() {
  return (
    <TailwindProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </AuthProvider>
    </TailwindProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// const something = (
//   <View style={styles.container}>
//     <Text className="text-blue-500 text-xl">
//       Open up App.js to start working on your app!
//     </Text>
//     <Button
//       title="Learn More"
//       color="#841584"
//       accessibilityLabel="Learn more about this purple button"
//     />
//     <StatusBar style="auto" />
//   </View>
// );
