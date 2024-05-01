import React, { useState } from "react";
import { StyleSheet } from 'react-native';
import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    axios.post('http://192.168.1.5:3000/users', {
      username: username,
      email: email,
      password: password
    })
    .then(response => {
      Alert.alert("Éxito", "Usuario creado con éxito!");
      AsyncStorage.setItem('userEmail', email)
      .then(() => {
        console.log('Email guardado', email);
      })
      .catch(error => {
        console.log('Error al guardar el email', error);
      });
      navigation.navigate('MyTabs');
    })
    .catch(error => {
      console.error('Error!', error);
      Alert.alert("Error", "No se pudo crear el usuario.");
    });
  };

  const handleLogin = () => {
    axios.post('http://192.168.1.5:3000/login', {
      email: email,
      password: password
    })
    .then(response => {
      Alert.alert("Éxito", "Inicio de sesión exitoso!");
      AsyncStorage.setItem('userEmail', email)
      .then(() => {
        console.log('Email guardado', email);
      })
      .catch(error => {
        console.log('Error al guardar el email', error);
      });
      navigation.navigate('MyTabs');
    })
    .catch(error => {
      console.error('Login Error', error);
      Alert.alert("Error", "Credenciales incorrectas o problemas de conexión.");
    });
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center justify-center bg-white">
          <Image source={require('../assets/images/login.gif')} style={styles.image} />
          <Text className="text-lg font-bold mt-[-90px]">Inicie sesión para continuar</Text>
          <TextInput
            className="input w-3/4 bg-gray-100 rounded-lg p-3 my-2 border border-gray-300"
            onChangeText={setEmail}
            value={email}
            placeholder="Correo electrónico"
            keyboardType="email-address"
          />
          <TextInput
            className="input w-3/4 bg-gray-100 rounded-lg p-3 my-2 border border-gray-300"
            onChangeText={setUsername}
            value={username}
            placeholder="Nombre de usuario"
          />
          <TextInput
            className="input w-3/4 bg-gray-100 rounded-lg p-3 my-2 border border-gray-300"
            onChangeText={setPassword}
            value={password}
            placeholder="Contraseña"
            secureTextEntry={true}
          />
          <TouchableOpacity className="bg-gray-600 py-3 px-4 rounded-lg mt-4 w-3/5 items-center" onPress={handleLogin}>
            <Text className="text-white font-bold">Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-600 py-3 px-4 rounded-lg mt-4 w-3/5 items-center" onPress={handleSignUp}>
            <Text className="text-white font-bold">Crear Cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    marginTop: -100,
  },
});

export default LoginScreen;
