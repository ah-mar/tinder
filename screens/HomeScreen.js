import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import cardData from "../cardData";
import { db, doSignOut } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import generateId from "../lib/generateId";

const HomeScreen = () => {
  const navigator = useNavigation();
  const { user1 } = useAuth();
  const swipeRef = useRef(null);
  const [profiles, setProfiles] = useState([]);

  const selectedArray = [];
  const rejectedArray = [];

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", user1.uid), (snapshot) => {
      if (!snapshot.exists()) {
        navigator.navigate("Modal");
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "users", user1.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const swipes = await getDocs(
        collection(db, "users", user1.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user1.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchCards();
  }, []);

  function swipeLeft(cardIndex) {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];
    console.log(`You swiped pass on ${userSwiped.displayName}`);

    setDoc(doc(db, "users", user1.uid, "passes", userSwiped.id), userSwiped);
  }

  async function swipeRight(cardIndex) {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];

    const loggedInProfile = (await getDoc(doc(db, "users", user1.uid))).data();

    // Check if user swiped on you
    getDoc(doc(db, "users", userSwiped.id, "swipes", user1.uid)).then(
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          // user has matched with you before you matched with them
          //Create a match
          console.log(`you matched with ${userSwiped.id}`);

          // Create a match

          setDoc(doc(db, "matches", generateId(userSwiped.id, user1.uid)), {
            users: {
              [user1.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user1.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          navigator.navigate("Match", {
            loggedInProfile,
            userSwiped,
          });
        } else {
          // User has swiped first interacttion or already passed
          console.log(`You swiped right on ${userSwiped.displayName}`);
        }
      }
    );

    setDoc(doc(db, "users", user1.uid, "swipes", userSwiped.id), userSwiped);
  }

  return (
    <SafeAreaView className="flex-1 relative justify-between">
      <View className="flex-row justify-between items-center px-4">
        <TouchableOpacity onPress={doSignOut}>
          <Ionicons name="person-circle-outline" size={40} color="#fe3c72" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigator.navigate("Modal")}>
          <Image
            className="w-10 h-10 rounded-full"
            source={require("../assets/tinder.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigator.navigate("Chat")}>
          <Ionicons name="chatbubbles-outline" size={40} color="#fe3c72" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 ">
        <Swiper
          ref={swipeRef}
          verticalSwipe={false}
          cards={profiles}
          renderCard={(card) =>
            card ? (
              <View className="justify-center items-center bg-white py-6 border rounded border-gray-400 shadow-lg">
                <Image
                  source={{ uri: card.photoUrl }}
                  style={{ width: 325, height: 450 }}
                />
                <Text className="mt-5 text-center bg-transparent text-lg">
                  {card.displayName}
                </Text>
              </View>
            ) : (
              <View className="justify-center items-center bg-white py-6 border rounded border-gray-400 shadow-lg">
                <Image
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Breathe-face-devil-sad.svg/240px-Breathe-face-devil-sad.svg.png",
                  }}
                  style={{ width: 325, height: 450 }}
                />
                <Text className="mt-5 text-center bg-transparent text-lg">
                  No More Matches, Try Later
                </Text>
              </View>
            )
          }
          onSwiped={(cardIndex) => {}}
          onSwipedLeft={(cardIndex) => {
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            swipeRight(cardIndex);
          }}
          onSwipedAll={() => {}}
          cardIndex={0}
          backgroundColor={"#DDDDDD"}
          stackSize={3}
        ></Swiper>
      </View>

      <View className="flex-row justify-between p-4">
        <Button
          color="#555555"
          title="Reject"
          onPress={() => swipeRef.current.swipeLeft()}
        />
        <Button
          color="#fe3c72"
          title="Accept"
          onPress={() => swipeRef.current.swipeRight()}
        />
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
