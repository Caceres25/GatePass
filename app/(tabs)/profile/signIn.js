import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { auth, db } from '../../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { UserContext } from '../../context/UserContext';
import { doc, getDoc } from 'firebase/firestore';

export default function SignIn({ navigation }) {
const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, setIsAuthenticated } = useContext(UserContext);


    const handleSignIn = async () => {
        console.log("signin")
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (!userDoc.exists()) {
            alert('Incorrect email or password');
            return;
          }
          setUser(userDoc.data());
          setIsAuthenticated(true);
          navigation.navigate('Profile');
        } catch (error) {
            console.log(error);
        }
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