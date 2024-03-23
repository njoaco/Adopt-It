import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../constants";

const NotificationsScreen = () => {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Notificaciones',
            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerTitle,
        });
    }, [navigation]);

    return(
        <View style={styles.container}>
            <Image source={require('../assets/images/notificaciones.gif')} style={styles.image} />
            <Text></Text>
            <Text style={styles.notificationtext}>Sin notificaciones</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontFamily: 'DMSansBold',
        fontSize: 20,
        color: COLORS.black,
    },
    notificationtext: {
        fontFamily: 'DMSansBold',
        fontSize: 16,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginTop: -100,
      },
});

export default NotificationsScreen;
