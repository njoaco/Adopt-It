import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Button, Alert, TouchableOpacity, Switch} from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AccountScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('userEmail')
            .then(userEmail => {
                if (userEmail !== null) {
                    axios.get(`http://192.168.1.5:3000/usuario?email=${encodeURIComponent(userEmail)}`)
                        .then(response => {
                            setUsername(response.data.username);  // Establece el nombre de usuario obtenido
                        })
                        .catch(error => {
                            console.error('Error al recuperar los datos del usuario', error);
                            Alert.alert("Error", "No se pudo recuperar la información del usuario.");
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
        //<ScrollView>
        
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/DefaultProfilePicture.jpg')} // Reemplaza 'your_image.png' con la ruta de tu imagen
                    style={styles.image}
                />
                <Text style={styles.welcomeback}>Bienvenido de nuevo, {username} </Text>
                <Text style={styles.yourpets}>Tus Mascotas</Text>
                <View style={styles.rectContainer}>
                    <TouchableOpacity onPress={() => handleRectPress(0)}>
                        <View style={styles.rect}></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleRectPress(1)}>
                        <View style={styles.rect}></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleRectPress(2)}>
                        <View style={styles.rect}></View>
                    </TouchableOpacity>
                </View>

                <Text style={styles.welcomeback}>Configuración</Text>

                <View style={styles.switchContainer}>
                    <Text style={styles.switchText}>Modo Oscuro</Text>
                    <Switch
                    />
                </View>
                
                {/* Agregar la imagen debajo del switch */}
                <Image
                    source={require('../assets/images/DefaultProfilePicture.jpg')} // Reemplaza 'your_image.png' con la ruta de tu imagen
                    style={styles.image}
                />

                <Text></Text>

                <Button title="Informar de un problema" />

                <Text></Text>

                <Button title="Cerrar Sesion" />

                <View>
                    
                <Image
                        //source={{ uri: result }}
                        //style={{ width: 100, height: 100 }} // Ajusta el ancho y alto según sea necesario
                        />
                </View>
                

            </View>
        //</ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10, // Agrega un poco de espacio en la parte superior
        paddingHorizontal: 20, // Ajusta el espaciado horizontal según sea necesario
        //backgroundColor: Darkmode ? '#020202' : '#F3F3F3', // Cambia esto al color que prefieras
    },
    headerTitle: {
        fontFamily: 'DMSansBold',
        fontSize: 20,
    },
    image: {
        width: 50, // Ajusta el ancho según sea necesario
        height: 50, // Ajusta el alto según sea necesario
        position: 'absolute', // Ajusta la posición a absoluta
        top: 10, // Ajusta la posición verticalmente
        left: 20, // Ajusta la posición horizontalmente
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
    rectContainer: {
        flexDirection: 'row', // Alinear los rectángulos en una fila
        marginTop: 10, // Espaciado superior
    },
    rect: {
        width: 100, // Ancho de cada rectángulo
        height: 140, // Altura de cada rectángulo
        backgroundColor: 'gray', // Color del rectángulo
        borderRadius: 10, // Bordes suaves
        marginRight: 10, // Espacio entre rectángulos
    },
    switchContainer: {
        flexDirection: 'row', // Alinear elementos en una fila
        alignItems: 'center', // Alinear elementos verticalmente al centro
        marginTop: 20, // Espaciado superior
    },
    switchText: {
        fontFamily: 'DMSansRegular',
        fontSize: 16,
        marginRight: 10,
    },
});

export default AccountScreen;