import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import signIn from './signIn'
import profile from './profile'
import register from './register'

const Stack = createStackNavigator()

export default function ProfileStack() {

  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Profile" component={profile} />
        <Stack.Screen name="SignIn" component={signIn} />
        <Stack.Screen name="Register" component={register} />
      </Stack.Navigator>
  )
}