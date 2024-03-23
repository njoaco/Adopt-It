import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router';
import { icons, SIZES, SHADOWS } from  '../../../constants/';

const Welcome = () => {
  const router = useRouter();
  
  return (
    <View>
      <View>
        <Text style={styles.welcomeText}>Bienvenido, Usuario</Text>
        <Text style={styles.subText}>Encuentra tu mascota preferida</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  welcomeText: {
    fontFamily: '../AdoptIt_Project/assets/fonts/DMSans-Regular.ttf', // Reemplaza 'MiFuente-Bold' con el nombre real de tu fuente personalizada
    fontSize: 16,
    fontWeight: 'regular',
    // Otros estilos de texto que desees aplicar
  },
  subText: {
    fontFamily: '../AdoptIt_Project/assets/fonts/DMSans-Bold.ttf', // Reemplaza 'MiFuente-Bold' con el nombre real de tu fuente personalizada
    fontSize: 24,
    fontWeight: 'bold',
    // Otros estilos de texto que desees aplicar
  },
});

export default Welcome
