import { useNavigation } from "@react-navigation/native";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/Header";
import ReceiverMessage from "../components/ReceiverMessage";
import SenderMessage from "../components/SenderMessage";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";

const MessageScreen = ({ route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const navigator = useNavigation();
  const { user1 } = useAuth();
  const { matchDetails } = route.params;

  function sendMessage(e) {
    console.log(e.nativeEvent.text);
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user1.uid,
      displayName: user1.displayName,
      photoUrl: matchDetails.users[user1.uid].photoUrl,
      message: input,
    });

    setInput("");
  }

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [matchDetails, db]
  );

  return (
    <SafeAreaView className="flex-1">
      <Header
        title={getMatchedUserInfo(matchDetails.users, user1.uid).displayName}
        callEnabled
      />
      <KeyboardAvoidingView
        className="flex-1"
        keyboardVerticalOffset={10}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <FlatList
              data={messages}
              inverted={-1}
              className="pl-4"
              keyExtractor={(item) => item?.id}
              renderItem={({ item: message }) =>
                message?.userId === user1?.uid ? (
                  <SenderMessage key={message?.id} message={message} />
                ) : (
                  <ReceiverMessage key={message?.id} message={message} />
                )
              }
            />
          </>
        </TouchableWithoutFeedback>

        <View className=" flex-row justify-between items-center border-t border-gray-300 px-5 py-2">
          <TextInput
            className="h-10 text-lg"
            placeholder="Send Message..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
          />
          <Button onPress={sendMessage} title="Send" color="#ff5864" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default MessageScreen;
