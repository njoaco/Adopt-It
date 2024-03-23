import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Button, Image, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const ShareScreen = () => {
    const [petname, setPetname] = useState(""); 
    const [razaname, setRazaname] = useState(""); 
    const [ubication, setUbication] = useState(""); 
    const [image, setImage] = useState(); 
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); 
    const [isButtonDisabledSend, setIsButtonDisabledSend] = useState(true); 
    const navigation = useNavigation();
    let fotoAvailable;

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

    const handleSubmit = () => {
        console.log("Nombre del animal:", petname);
        console.log("Raza:", razaname);
        console.log("Ubicación:", ubication);
        console.log("Imagen:", image);
        console.log("FotoAvailable:", fotoAvailable);
    
        if (petname && razaname && ubication && fotoAvailable != 0) {
            navigation.navigate('HomeScreen', {
                petname: petname,
                razaname: razaname,
                ubication: ubication,
                image: image
            });
    
            setPetname("");
            setRazaname("");
            setUbication("");
            setImage(null);
            setIsButtonDisabled(false);
            setIsButtonDisabledSend(true);
            alert("Tu mascota ha sido compartida!");
            //fotoAvailable = 0;
        } else {
            alert("Por favor completa todos los campos y carga una imagen antes de enviar.");
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