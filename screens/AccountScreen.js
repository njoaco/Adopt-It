import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, ScrollView, Switch, Button } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = () => {
    const [username, setUsername] = useState('');
    const [images, setImages] = useState([]);  // Estado para almacenar las URIs de las imágenes

    useEffect(() => {
        AsyncStorage.getItem('userEmail')
            .then(userEmail => {
                if (userEmail !== null) {
                    axios.get(`http://192.168.1.5:3000/user?email=${encodeURIComponent(userEmail)}`)
                        .then(response => {
                            setUsername(response.data.username);
                        })
                        .catch(error => {
                            console.error('Error al recuperar los datos del usuario', error);
                            Alert.alert("Error", "No se pudo recuperar la información del usuario.");
                        });

                    axios.get('http://192.168.1.5:3000/animals')
                        .then(response => {
                            console.log(response.data);  // Imprime los datos recibidos
                            setImages(response.data.map(item => item.image));  // Guarda todas las URIs de imágenes
                        })
                        .catch(error => {
                            console.error('Error al cargar las imágenes', error);
                            Alert.alert("Error", "No se pudieron cargar las imágenes.");
                        });
                } else {
                    Alert.alert("Error", "No se encontró el email del usuario.");
                }
            })
            .catch(error => {
                console.error('Error al leer el email', error);
                Alert.alert("Error", "Problema al acceder al almacenamiento local.");
            });
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/DefaultProfilePicture.jpg')}
                style={styles.image}
            />
            <Text style={styles.welcomeback}>Bienvenido de nuevo, {username}</Text>
            <Text style={styles.yourpets}>Tus Mascotas</Text>
            <ScrollView 
                horizontal={true} 
                style={styles.scrollContainer}
                showsHorizontalScrollIndicator={false}
            >
                {images.map((imgUri, index) => (
                    <TouchableOpacity key={index} onPress={() => Alert.alert("Image Pressed", "URI: " + imgUri)}>
                        <View style={styles.rect}>
                            <Image source={{ uri: imgUri }} style={styles.imageFromServer} />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Text style={styles.welcomeback}>Configuración</Text>
            <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Modo Oscuro</Text>
                <Switch />
            </View>
            <Button title="Informar de un problema" />
            <Button title="Cerrar Sesión" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 20,
        backgroundColor: '#F3F3F3',
    },
    image: {
        width: 50,
        height: 50,
        position: 'absolute', 
        top: 10,
        left: 20,
    },
    welcomeback: {
        fontFamily: 'DMSansBold',
        fontSize: 20,
        marginTop: 60,
    },
    yourpets: {
        fontFamily: 'DMSansRegular',
        fontSize: 15,
        marginTop: 15,
    },
    scrollContainer: {
        height: 200,
    },
    rect: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: 'gray',
        borderRadius: 10,
    },
    imageFromServer: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    switchText: {
        fontFamily: 'DMSansRegular',
        fontSize: 16,
        marginRight: 10,
    },
});

export default AccountScreen;