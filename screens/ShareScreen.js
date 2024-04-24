import React, { useState, useContext, useEffect} from "react";
import { View, Text, StyleSheet, TextInput, Button, Image, ScrollView, Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ShareScreen = () => {
    const [petname, setPetname] = useState(""); 
    const [razaname, setRazaname] = useState(""); 
    const [ubication, setUbication] = useState("");
    const [description, setDescription] = useState("");
    const [publishBy, setPublishBy] = useState("");  
    const [image, setImage] = useState(); 
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); 
    const [isButtonDisabledSend, setIsButtonDisabledSend] = useState(true); 
    const navigation = useNavigation();
    let fotoAvailable;

    useEffect(() => {
        AsyncStorage.getItem('userEmail')
            .then(userEmail => {
                if (userEmail !== null) {
                    axios.get(`http://192.168.1.5:3000/usuario?email=${encodeURIComponent(userEmail)}`)
                        .then(response => {
                            setPublishBy(response.data.username); 
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

    const handleSubmit = () => {        
        axios.post('http://192.168.1.5:3000/animales', {
          nombre: petname,
          raza: razaname,
          ubicacion: ubication,
          descripcion: description,
          publishBy: publishBy,
        })
        .then(response => {
          Alert.alert("Éxito", "Animal agregado!");
          setPetname("");
          setRazaname("");
          setUbication("");
          setDescription("");
          setImage(null);
          setIsButtonDisabled(false);
          setIsButtonDisabledSend(true);
        })
        .catch(error => {
          console.error('Error!', error);
          Alert.alert("Error", "No se pudo crear el animal.");
        });
      };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Adopt.It', 
            headerTitleAlign: 'center', 
            headerTitleStyle: styles.headerTitle 
        });
    }, [navigation]);

    const handlePetnameChange = (text) => {
        setPetname(text); 
    };

    const handleRazanameChange = (text) => {
        setRazaname(text); 
    };

    const handleUbicationChange = (text) => {
        setUbication(text); 
    };

    const handleDescriptionChange = (text) => {
        setDescription(text); 
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            fotoAvailable = 1;
            console.log("Imagen subida correctamente", fotoAvailable);
            setImage(result.uri);
            setIsButtonDisabled(true);
            setIsButtonDisabledSend(false);
        }

        if (result.cancelled) {
            fotoAvailable = 0;
            console.log("Imagen Cancelada", fotoAvailable);
            setImage(result.uri);
            setIsButtonDisabled(true);
            setIsButtonDisabledSend(false);
        }
    };

    const camera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setIsButtonDisabled(false);
            setIsButtonDisabledSend(false);
        } else {
            setIsButtonDisabled(true);
            setIsButtonDisabledSend(true);
        }
    };

    return (
    //<ScrollView>     
        <View style={styles.container}>
      

      <Text style={styles.welcomeText}>Comparte tu mascota!</Text>

          <Text></Text>

          <Image source={require('../assets/images/share.gif')} style={{ width: '100%', height: 200, resizeMode: 'contain', marginTop: -50 }} />
      
          <Text style={styles.titles}>Nombre del animal</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            onChangeText={handlePetnameChange}
            value={petname}
          />
      
          <Text style={styles.titles}>Raza</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            onChangeText={handleRazanameChange}
            value={razaname}
          />
      
          <Text style={styles.titles}>Ubicación</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            onChangeText={handleUbicationChange}
            value={ubication}
          />

          <Text style={styles.titles}>Descripcion</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            onChangeText={handleDescriptionChange}
            value={description}
          />
      
          <Button title="Seleccionar Foto" onPress={pickImage} disabled={isButtonDisabled} />
      
          <Text></Text>
      
          <Button title="Sacar Foto" onPress={camera} disabled={isButtonDisabled} />
      
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      
          <Text></Text>
      
          <Button title="Enviar" onPress={handleSubmit} disabled={isButtonDisabledSend}  />
      
        </View>
    //</ScrollView> 
      );
}

const styles = StyleSheet.create({
    headerTitle: {
        fontFamily: 'DMSansBold',
        fontSize: 20,
    },
    welcomeText: {
        fontFamily: 'DMSansBold',
        fontSize: 16,
        fontWeight: 'regular',
      },
    petText: {
        fontFamily: 'DMSansBold.ttf',
        fontSize: 15,
        fontWeight: 'bold',
      },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    titles: {
        fontFamily: 'DMSansBold',
        fontSize: 15,
        marginBottom: 8
    },
    input: {
        width: "80%",
        height: 40,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
});

export default ShareScreen;