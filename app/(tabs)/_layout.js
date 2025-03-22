import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';




export default function TabLayout() {
  const { user } = useContext(UserContext);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
        backgroundColor: '#25292e',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          ),
        }}
      />
      <Tabs.Screen
      name="profile"
      options={{
        title: 'Profile',
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} color={color} size={24}/>
        ),
      }}
    />
    <Tabs.Screen
    name="guard"
    redirect={user?.role !== 'guard'}
    options={{
      title: 'Guard',
      tabBarIcon: ({ color, focused }) => (
        <Ionicons name={focused ? 'shield-checkmark' : 'shield-checkmark-outline'} color={color} size={24}/>
      ),
    }}
    />
    </Tabs>
  );
}
