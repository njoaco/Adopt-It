import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../constants";
import { Stack, useRouter } from "expo-router";
import NetInfo from '@react-native-community/netinfo';
import Offline from './OfflineScreen';
import Pets from '../components/home/welcome/pets';

const HomeScreen = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

     const Profile = () =>{
     navigation.navigate('AccountScreen');
  }

    React.useLayoutEffect(() => {
        
        navigation.setOptions({
            headerTitle: 'Adopt.It', 
            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerTitle,
            headerLeft: () => (
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => {
                        navigation.navigate("Stack")
                    }}
                >
                    <Image source={require('../assets/icons/notifications.png')} style={styles.headerButtonImage} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => {
                        navigation.navigate("Cuenta")
                    }}
                >
                    <Image source={require('../assets/images/DefaultProfilePicture.jpg')} style={styles.headerButtonImage} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    if (!isConnected) {
        return <Offline />;
    }

    return(
        <ImageBackground source={require('../assets/images/Background.png')} style={styles.backgroundImage}>
          <SafeAreaView style={styles.container}>
                  <View>
                        <Pets />
                    </View>
            
           </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
      fontFamily: 'DMSansBold',
      fontSize: 20,
    },
    container: {
        flex: 1,
    },
    text: {
        color: 'transparent',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    headerButton: {
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: COLORS.white,
    },
    headerButtonImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    }
});

export default HomeScreen;