import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getVisits } from '../../visits';

export default function History() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchVisits() {
    setLoading(true);
    const visitsData = await getVisits();
    setVisits(visitsData);
    setLoading(false);
  }

  useEffect(() => {
    fetchVisits();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <View className="px-5 pt-5">
        <Text className="text-2xl font-bold mb-5">Recent Visits</Text>
      </View>
      <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
        {visits.map((visit) => (
          <View key={visit.id} className="bg-white p-4 rounded-lg mb-3 shadow-sm">
            <Text className="text-lg font-semibold">{visit.visitorName}</Text>
            <Text className="mt-1 text-gray-600">{visit.status}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
