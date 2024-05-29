import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder, Platform, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Pets = () => {
  const [animals, setAnimals] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = new Animated.ValueXY();
  const [likeSound, setLikeSound] = useState(null);
  const [nopeSound, setNopeSound] = useState(null);

  // Función de barajado (Fisher-Yates)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('userEmail');
        if (userEmail !== null) {
          const response = await axios.get('http://192.168.1.5:3000/animals');
          const filteredAnimals = response.data.filter(animal => animal.publishBy !== userEmail);
          const shuffledAnimals = shuffleArray(filteredAnimals); // Barajar la lista de animales
          setAnimals(shuffledAnimals);
        } else {
          Alert.alert("Error", "No se encontró el email del usuario.");
        }
      } catch (error) {
        console.error('Error fetching animals:', error);
        Alert.alert("Error", "No se pudieron cargar los animales.");
      }
    };

    fetchAnimals();
    loadSounds();

    return () => {
      if (likeSound) {
        likeSound.unloadAsync();
      }
      if (nopeSound) {
        nopeSound.unloadAsync();
      }
    };
  }, []);

  const loadSounds = async () => {
    const { sound: like } = await Audio.Sound.createAsync(
      require('../../../assets/sounds/Swipe1.mp3')
    );
    const { sound: nope } = await Audio.Sound.createAsync(
      require('../../../assets/sounds/Swipe1.mp3')
    );
    setLikeSound(like);
    setNopeSound(nope);
  };

  const playSound = async (sound) => {
    if (sound) {
      await sound.replayAsync();
    }
  };

  const handleLike = async (animalId) => {
    const userEmail = await AsyncStorage.getItem('userEmail');
    try {
      await axios.post('http://192.168.1.5:3000/like', { animalId, likedBy: userEmail });
    } catch (error) {
      console.error('Error registrando el like:', error);
    }
  };

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  });

  const rotateAndTranslate = {
    transform: [{
      rotate: rotate
    },
    ...position.getTranslateTransform()
    ]
  };

  const likeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp'
  });

  const dislikeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp'
  });

  const nextCardOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp'
  });

  const nextCardScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp'
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 120) {
        playSound(likeSound);
        handleLike(animals[currentIndex].id);
        Animated.spring(position, {
          toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
          useNativeDriver: true
        }).start(() => {
          setCurrentIndex(currentIndex + 1);
          position.setValue({ x: 0, y: 0 });
        });
      } else if (gestureState.dx < -120) {
        playSound(nopeSound);
        Animated.spring(position, {
          toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
          useNativeDriver: true
        }).start(() => {
          setCurrentIndex(currentIndex + 1);
          position.setValue({ x: 0, y: 0 });
        });
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: true
        }).start();
      }
    }
  });

  const renderUsers = () => {
    return animals.map((item, i) => {
      if (i < currentIndex) {
        return null;
      } else if (i === currentIndex) {
        return (
          <Animated.View
            {...panResponder.panHandlers}
            key={item.id}
            style={[rotateAndTranslate, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}
          >
            <Animated.View style={{ opacity: likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
            </Animated.View>

            <Animated.View style={{ opacity: dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
            </Animated.View>

            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={{ uri: item.image }}
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.cardText}>{item.location}</Text>
              <Text style={styles.cardText}>{item.age} años</Text>
              <Text style={styles.cardText}>{item.description}</Text>
            </View>
          </Animated.View>
        );
      } else {
        return (
          <Animated.View
            key={item.id}
            style={[{
              opacity: nextCardOpacity,
              transform: [{ scale: nextCardScale }],
              height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
            }]}
          >
            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={{ uri: item.image }}
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.cardText}>{item.location}</Text>
              <Text style={styles.cardText}>{item.age} años</Text>
              <Text style={styles.cardText}>{item.description}</Text>
            </View>
          </Animated.View>
        );
      }
    }).reverse();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 60 }}></View>
      <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? -50 : -50 }}>
        {renderUsers()}
      </View>
      <View style={{ height: 60 }}></View>
    </View>
  );
};

export default Pets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
  },
  cardText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
  },
});
