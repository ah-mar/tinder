import { View, Text } from "react-native";
const SenderMessage = ({ message }) => {
  return (
    <View className="bg-purple-600 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2 ml-auto self-end">
      <Text className="text-white">{message?.message}</Text>
    </View>
  );
};
export default SenderMessage;
