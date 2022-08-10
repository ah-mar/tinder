import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";

const ChatRow = ({ matchDetails }) => {
  const navigator = useNavigation();
  const { user1 } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user1.uid));
  }, [matchDetails, user1]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setLastMessage(snapshot.docs[0]?.data().message)
      ),
    [matchDetails, db]
  );

  return (
    <TouchableOpacity
      onPress={() =>
        navigator.navigate("Message", { matchDetails: matchDetails })
      }
      className="flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg shadow"
    >
      <Image
        className="rounded-full h-16 w-16 mr-4"
        source={{ uri: matchedUserInfo?.photoUrl }}
      />
      <View>
        <Text className="text-lg font-semibold">
          {matchedUserInfo?.displayName}
        </Text>
        <Text>{lastMessage || "Say Hi"}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default ChatRow;
