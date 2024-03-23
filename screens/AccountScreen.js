import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Switch, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AccountLogged, setAccountLogged, Username, setUsername, Darkmode, setDarkmode } from "../variables_globales";
import { email, setEmail } from './LoginScreen';

const AccountScreen = () => {
    const navigation = useNavigation();
    const [isDarkMode, setIsDarkMode] = React.useState(Darkmode);
    let LogOutV;

    const LogOut = () => {
        LogOutV = 1;
        console.log("Sesión Cerrada", LogOutV );
        alert ('Tu sesión ha sido cerrada correctamente.');
        setAccountLogged(false);
        navigation.navigate('LoginScreen'); // Navega a MyTabs en lugar de HomeScreen

    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Adopt.It', // Establecer el título del header como "Adopt.It"
            headerTitleAlign: 'center', // Centrar el título del header
            headerTitleStyle: styles.headerTitle // Asignar el estilo de texto personalizado
        });
    }, [navigation]);

    // Texto a mostrar dependiendo del valor de AccountLogged
    const textToShow = AccountLogged ? "Cuenta iniciada" : "Iniciar sesión";
    const textUsername = AccountLogged ? Username : null;

    const handleRectPress = (index) => {
        // Acción a realizar cuando se presiona un rectángulo
        console.log("Rectángulo presionado:", index);
    };

    //const [isDarkMode, setIsDarkMode] = React.useState(false);

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setDarkmode(newDarkMode);
        setIsDarkMode(newDarkMode);
        if (newDarkMode) {
            console.log("Modo oscuro activado", Darkmode);
        } else {
            console.log("Modo oscuro desactivado", );
        }
    };

    return (
        //<ScrollView>
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/DefaultProfilePicture.jpg')} // Reemplaza 'your_image.png' con la ruta de tu imagen
                    style={styles.image}
                />
                <Text style={styles.welcomeback}>Bienvenido de nuevo, {email} </Text>
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
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleDarkMode}
                        value={isDarkMode}
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

                <Button title="Cerrar Sesion" onPress={LogOut} />

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