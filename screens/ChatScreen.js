import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatList from "../components/ChatList";
import Header from "../components/Header";

const ChatScreen = ({ matchDetails }) => {
  const navigator = useNavigation();
  return (
    <SafeAreaView>
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  );
};
export default ChatScreen;
