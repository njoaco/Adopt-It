import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button, Image, TextInput, Alert } from "react-native";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../backend/firebase-config';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  let byPassAccount = false;

  const handleCreateAccount= () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentil) =>{
      console.log("Cuenta creada con exito!")
      const user = userCredentil.user;
      console.log(user)
      Alert.alert("Cuenta creada con exito! Bienvenido ", email)
      navigation.navigate('MyTabs');
    })
    .catch(error =>{
      console.log(error)
      Alert.alert(error.message)
    })
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredentil) =>{
      console.log("Logeado!")
      const user = userCredentil.user;
      console.log(user)
      Alert.alert("Bienvenido! ", email)
      navigation.navigate('MyTabs');
    })
    .catch(error =>{
      console.log(error)
      Alert.alert(error.message)
    })
  }

  //const LogIn = () =>{
    // Aquí puedes agregar la lógica para verificar el nombre de usuario y la contraseña
  //  setAccountLogged(true);
  //  navigation.navigate('MyTabs'); // Navega a MyTabs en lugar de HomeScreen
  //}

  if ( byPassAccount !=  false){
    navigation.navigate('MyTabs');
  }
  
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/login.gif')} style={styles.image} />
      <Text style={styles.text}>Inicie sesión para continuar</Text>
      <Text></Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Correo electronico"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Contraseña"
        secureTextEntry
      />

      <Text></Text>
      
      <Button title="Iniciar Sesión" onPress={handleSignIn}  />

      <Text></Text>

      <Button title="Crear Cuenta" onPress={handleCreateAccount}  />
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

export default LoginScreen ;
