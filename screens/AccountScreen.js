import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, ScrollView, Button } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = () => {
    const [username, setUsername] = useState('');
    const [images, setImages] = useState([]);
    const [petNames, setPetNames] = useState([]);
    const [race, setRace] = useState([]);
    const [age, setAge] = useState([]);
    const [location, setLocation] = useState([]);
    const [description, setDescription] = useState([]);
    const [animalIds, setAnimalIds] = useState([]);

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
    
                    axios.get(`http://192.168.1.5:3000/animals/byPublisher?publisherEmail=${encodeURIComponent(userEmail)}`)
                        .then(response => {
                            const animalsData = response.data;
                            setImages(animalsData.map(item => item.image));
                            setPetNames(animalsData.map(item => item.name));
                            setRace(animalsData.map(item => item.race));
                            setAge(animalsData.map(item => item.age));
                            setLocation(animalsData.map(item => item.location));
                            setDescription(animalsData.map(item => item.description));
                            setAnimalIds(animalsData.map(item => item.id));
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
    
    const deleteAnimal = (index) => {
        const animalId = animalIds[index]; 
        axios.delete(`http://192.168.1.5:3000/animals/${animalId}`)
            .then(response => {
                Alert.alert("Éxito", "Animal eliminado correctamente");
                setImages(prev => prev.filter((_, i) => i !== index));
                setPetNames(prev => prev.filter((_, i) => i !== index));
                setRace(prev => prev.filter((_, i) => i !== index));
                setAge(prev => prev.filter((_, i) => i !== index));
                setLocation(prev => prev.filter((_, i) => i !== index));
                setDescription(prev => prev.filter((_, i) => i !== index));
                setAnimalIds(prev => prev.filter((_, i) => i !== index));
            })
            .catch(error => {
                console.error('Error al eliminar el animal', error);
                Alert.alert("Error", "No se pudo eliminar el animal");
            });
    };
    
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
                    <TouchableOpacity key={index} onPress={() => 
                        Alert.alert(
                            "Detalles de Mascota",
                            `Nombre: ${petNames[index]}\nRaza: ${race[index]}\nEdad: ${age[index]}\nUbicacion: ${location[index]}\nDescripcion: ${description[index]}\nURI: ${imgUri}`,
                            [
                                { text: "OK" },
                                { text: "Borrar", onPress: () => deleteAnimal(index) }
                            ]
                        )
                    }>
                        <View style={styles.rect}>
                            <Image source={{ uri: imgUri }} style={styles.imageFromServer} />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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
        height: 200,
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
});

export default AccountScreen;
