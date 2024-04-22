import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image, TextInput, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';  // Importa axios para hacer solicitudes HTTP

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');  // Este campo parece no ser necesario para el login
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Función para manejar la creación de la cuenta
    axios.post('http://192.168.1.5:3000/usuarios', {
      nombre: username,
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
      navigation.navigate('MyTabs');  // Suponiendo que quieres navegar a 'MyTabs'
    })
    .catch(error => {
      console.error('Error!', error);
      Alert.alert("Error", "No se pudo crear el usuario.");
    });
  };

  const handleLogin = () => {
    // Función para manejar el inicio de sesión
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
      navigation.navigate('MyTabs');  // Suponiendo que 'MyTabs' es tu pantalla de destino post-login
    })
    .catch(error => {
      console.error('Login Error', error);
      Alert.alert("Error", "Credenciales incorrectas o problemas de conexión.");
    });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/login.gif')} style={styles.image} />
      <Text style={styles.text}>Inicie sesión para continuar</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Correo electrónico"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setUsername} // Considerar remover si no es necesario para el login
        value={username}
        placeholder="Nombre de usuario" // Considerar remover si no es necesario para el login
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Contraseña"
        secureTextEntry={true}
      />

      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <Text></Text>
      <Button title="Crear Cuenta" onPress={handleSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    marginTop: -100,
  },
  text: {
    fontFamily: 'DMSansBold',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -90,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default LoginScreen;
