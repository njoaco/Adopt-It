import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Offline = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/offline1.gif')} style={styles.image} />
      <Text style={styles.text}>Sin Conexión</Text>
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
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: 'DMSansBold',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default Offline;
