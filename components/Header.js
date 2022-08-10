import { View, Text, TouchableOpacity } from "react-native";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, callEnabled }) => {
  const navigator = useNavigation();

  return (
    <View className="p-2 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <TouchableOpacity className="p-2" onPress={() => navigator.goBack()}>
          <Ionicons name="chevron-back-outline" size={34} color="#ff5864" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold pl-2">{title}</Text>
      </View>

      {callEnabled && (
        <TouchableOpacity className=" mr-4 " onPress={() => navigator.goBack()}>
          <Foundation name="telephone" size={26} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default Header;
