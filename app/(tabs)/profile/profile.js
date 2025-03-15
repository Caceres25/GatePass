import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { storage } from '../../../firebaseConfig';
import { useEffect } from 'react';

export default function Profile({ navigation }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    console.log('fetching images');
    const imagesRef = ref(storage, 'images/');
    console.log(imagesRef);
    const result = await listAll(imagesRef);
    console.log(result);
    const urls = await Promise.all(result.items.map((item) => getDownloadURL(item)));
    setImageUrls(urls);
    console.log(urls);
    setLoading(false);
  }

  const pickImage = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `images/${Date.now()}`);
    await uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        console.log('File available at', downloadUrl);
        fetchImages();
      });
    });
  };

  return (
    <View>
      <Text>profile</Text>
      <Button title="Sign In" onPress={()=> navigation.navigate("SignIn")} />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {loading && <Text>Loading images...</Text>}
      {imageUrls.map((url, index) => (
        <Image key={index} source={{ uri: url }} style={{ width: 200, height: 200 }} />
      ))}
    </View>
  )
}
