import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { auth, db } from '../../../firebaseConfig';

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleRegister = async () => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
    
          // Add user to Firestore with role
          await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            name: 'User Name', // Replace with actual user name
            role: 'user' // or 'admin', 'moderator', etc.
          });
    
          alert('User registered successfully!');
        } catch (error) {
          alert(error.message);
        }
    };

    return (
      <View className="flex-1 justify-center items-center p-6 bg-gray-100">
      <Text className="text-3xl font-bold mb-6 text-gray-800">Register</Text>
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
        onPress={handleRegister}
      >
        <Text className="text-center text-white text-lg font-semibold">Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="w-full p-4 bg-gray-300 rounded-lg"
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text className="text-center text-gray-800 text-lg font-semibold">Sign In</Text>
      </TouchableOpacity>
    </View>
      );
}