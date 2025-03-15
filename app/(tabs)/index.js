import { signOut } from 'firebase/auth';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Button } from 'react-native';
import { auth } from '../../firebaseConfig';

export default function Index() {
  const generateQrCode = () => {
    const qrData = 'Your QR Code Data'; // Replace with your actual data
    console.log('QR Code generated:', qrData);
  };

  return (
    <View className="flex-1 bg-gray-100 p-5">
      <View className="mb-5">
        <Text className="text-3xl font-bold mb-3">Welcome Home</Text>
        <Text className="text-lg text-gray-700">Resident #83u9288</Text>
      </View>
      <View className="mb-5">
        <Button title="Generate QR Code for Visitor" onPress={generateQrCode} />
      </View>
      <ScrollView className="flex-1">
        <View className="bg-white p-4 rounded-lg mb-3 shadow-sm">
          <Text className="text-lg font-semibold">Community News</Text>
          <Text className="mt-1 text-gray-600">Stay updated with the latest news in the community.</Text>
        </View>
        <View className="bg-white p-4 rounded-lg mb-3 shadow-sm">
          <Text className="text-lg font-semibold">Upcoming Events</Text>
          <Text className="mt-1 text-gray-600">Check out the upcoming events in the community.</Text>
        </View>
        <View className="bg-white p-4 rounded-lg mb-3 shadow-sm">
          <Text className="text-lg font-semibold">Amenities</Text>
          <Text className="mt-1 text-gray-600">Explore the amenities available in the community.</Text>
        </View>
      </ScrollView>
    </View>
  );
}
