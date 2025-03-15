import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function SignIn({ navigation }) {
const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSignIn = async () => {
        console.log("signin")
    };

    return (
        <View className="flex-1 justify-center items-center p-6 bg-gray-100">
              <Text className="text-3xl font-bold mb-6 text-gray-800">Sign In</Text>
              <TextInput
                className="w-full p-4 mb-4 border border-gray-300 rounded-lg bg-white"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                className="w-full p-4 mb-6 border border-gray-300 rounded-lg bg-white"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
              <TouchableOpacity
                className="w-full p-4 mb-4 bg-blue-500 rounded-lg"
                onPress={handleSignIn}
              >
                <Text className="text-center text-white text-lg font-semibold">Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-full p-4 bg-gray-300 rounded-lg"
                onPress={() => navigation.navigate('Register')}
              >
                <Text className="text-center text-gray-800 text-lg font-semibold">Register</Text>
              </TouchableOpacity>
            </View>
      );
}