import React, { useState, useContext, useEffect} from "react";
import { View, Text, StyleSheet, TextInput, Button, Image, ScrollView, Alert, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';  // Importa axios para hacer solicitudes HTTP
import * as FileSystem from 'expo-file-system';

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
                    axios.get(`http://192.168.1.5:3000/user?email=${encodeURIComponent(userEmail)}`)
                        .then(response => {
                            setPublishBy(response.data.username); 
                            console.log('Usuario cargado');
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


    const handleImageSave = () => {        
        axios.post('http://192.168.1.5:3000/animals', {
            name: petname,
            race: razaname,
            location: ubication,
            description: description,
            publishBy: publishBy,
            image: image
          })
          .then(response => {
            Alert.alert("Éxito", "Mascota subida!");
            //resetForm();
          })
          .catch(error => {
            console.error('Error!', error);
            Alert.alert("Error", "No se pudo subir la mascota.");
          });
        };
    
      const resetForm = () => {
        setPetname("");
        setRazaname("");
        setUbication("");
        setDescription("");
        setImage(null);
        setIsButtonDisabled(false);
        setIsButtonDisabledSend(true);
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
    
        if (!result.cancelled && result.assets) {
            console.log("Imagen seleccionada URI: ", result.assets[0].uri); //
            setImage(result.assets[0].uri);
            setIsButtonDisabled(false);
            setIsButtonDisabledSend(false);
        } else {
            setIsButtonDisabled(true);
            setIsButtonDisabledSend(true);
        }
    };
    
    const camera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.cancelled && result.assets) {
            console.log("Imagen capturada URI: ", result.assets[0].uri); // Acceder al primer objeto en assets
            setImage(result.assets[0].uri);
            setIsButtonDisabled(false);
            setIsButtonDisabledSend(false);
        } else {
            setIsButtonDisabled(true);
            setIsButtonDisabledSend(true);
        }
    };
    

    return (
    <ScrollView>     
        <View style={styles.container}>
      

      <Text className="p-8" style={styles.welcomeText}>Comparte tu mascota!</Text>

          <Text></Text>

          <Image source={require('../assets/images/share.gif')} style={{ width: '100%', height: 200, resizeMode: 'contain', marginTop: -50 }} />
      
          <Text style={styles.titles}>Nombre del animal</Text>
          <TextInput
            className="input w-3/4 bg-gray-100 rounded-lg p-1 my-2 border border-gray-300"
            placeholder=""
            onChangeText={handlePetnameChange}
            value={petname}
          />
      
          <Text style={styles.titles}>Raza</Text>
          <TextInput
            className="input w-3/4 bg-gray-100 rounded-lg p-1 my-2 border border-gray-300"
            placeholder=""
            onChangeText={handleRazanameChange}
            value={razaname}
          />
      
          <Text style={styles.titles}>Ubicación</Text>
          <TextInput
            className="input w-3/4 bg-gray-100 rounded-lg p-1 my-2 border border-gray-300"
            placeholder=""
            onChangeText={handleUbicationChange}
            value={ubication}
          />

          <Text style={styles.titles}>Descripción</Text>
          <TextInput
            className="input w-3/4 bg-gray-100 rounded-lg p-1 my-2 border border-gray-300"
            placeholder=""
            onChangeText={handleDescriptionChange}
            value={description}
          />
      
        <TouchableOpacity className="bg-gray-600 py-3 px-4 rounded-lg mt-4 w-3/5 items-center" onPress={pickImage} disabled={isButtonDisabled}>
            <Text className="text-white font-bold">Seleccionar Foto</Text>
        </TouchableOpacity>
      
        <TouchableOpacity className="bg-gray-600 py-3 px-4 rounded-lg mt-4 w-3/5 items-center" onPress={camera} disabled={isButtonDisabled}>
            <Text className="text-white font-bold">Camara</Text>
         </TouchableOpacity>
      
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      
          <TouchableOpacity className="bg-gray-600 py-3 px-4 rounded-lg mt-4 w-3/5 items-center" onPress={handleImageSave} disabled={isButtonDisabledSend}>
            <Text className="text-white font-bold">Enviar</Text>
         </TouchableOpacity>
      
        </View>
    </ScrollView> 
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
        //marginBottom: 8
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