//LoginScreen.js

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button, Image } from "react-native";
import { setAccountLogged } from "../variables_globales";

const LoginScreen = ({ navigation }) => {
  const LogIn = () =>{
    setAccountLogged(true);
    navigation.navigate('MyTabs'); // Navega a MyTabs en lugar de HomeScreen
}
  
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/login.gif')} style={styles.image} />
      <Text style={styles.text}>Inicie Sesión para continuar</Text>
      <Text></Text>
      <Button title="Iniciar Sesión" onPress={LogIn}  />
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
    fontFamily: 'DMSansBold', // Nombre de la fuente registrada
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -90,
  },
});

export default LoginScreen;
