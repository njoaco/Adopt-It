import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../constants";
import { Stack, useRouter } from "expo-router";
import NetInfo from '@react-native-community/netinfo';
import Offline from './OfflineScreen';
import Pets from '../components/home/welcome/pets';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const [isConnected, setIsConnected] = useState(true);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const fetchNotifications = async () => {
            const userEmail = await AsyncStorage.getItem('userEmail');
            if (userEmail) {
                try {
                    const response = await axios.get(`http://192.168.1.5:3000/notifications?email=${encodeURIComponent(userEmail)}`);
                    const newNotifications = response.data;
                    setNotifications(newNotifications);

                    // Configurar un temporizador para eliminar cada notificación después de 4 segundos
                    newNotifications.forEach((notification, index) => {
                        setTimeout(() => {
                            setNotifications((currentNotifications) =>
                                currentNotifications.filter((_, i) => i !== index)
                            );
                        }, 4000);
                    });
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            }
        };

        fetchNotifications();
    }, []);

    const Profile = () => {
        navigation.navigate('AccountScreen');
    }

    const handleChatPress = () => {
        navigation.navigate('Chat');
    };

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

    return (
        <ImageBackground source={require('../assets/images/Background.png')} style={styles.backgroundImage}>
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        <View style={styles.notificationsContainer}>
                            {notifications.map((notification, index) => (
                                <View key={index} style={styles.notification}>
                                    <Text style={styles.notificationText}>{notification.message}</Text>
                                    <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
                                        <Text style={styles.chatButtonText}>Chat</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        <View style={styles.petsContainer}>
                            <Pets />
                        </View>
                    </ScrollView>
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
    contentContainer: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
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
    },
    notificationsContainer: {
        padding: 10,
    },
    notification: {
        backgroundColor: COLORS.white,
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    notificationText: {
        fontSize: 16,
        flex: 1,
    },
    chatButton: {
        backgroundColor: COLORS.primary,
        padding: 5,
        borderRadius: 5,
    },
    chatButtonText: {
        color: COLORS.white,
        fontSize: 14,
    },
    petsContainer: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default HomeScreen;
