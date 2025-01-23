import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import AccountScreen from "./screens/AccountScreen";
import ShareScreen from "./screens/ShareScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import LoginScreen from "./screens/LoginScreen";
import ChatScreen from "./screens/ChatScreen"; // Importa la pantalla de Chat

import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const HomeStackNavigator = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <HomeStackNavigator.Navigator
            initialRouteName="HomeScreen"
        >
            <HomeStackNavigator.Screen
                name="HomeScreen"
                component={HomeScreen}
            />
            <HomeStackNavigator.Screen
                name="Stack"
                component={NotificationsScreen}
            />
            <HomeStackNavigator.Screen
                name="Chat"
                component={ChatScreen} // Agrega la pantalla de Chat
            />
        </HomeStackNavigator.Navigator>
    );
}

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: 'black',
            }}
        >
            <Tab.Screen
                name="Home"
                component={MyStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Fontisto name="paw" color={color} size={size} />
                    ),
                    //tabBarBadge: 5,
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Compartir"
                component={ShareScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="squared-plus" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Cuenta"
                component={AccountScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="user" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

function Cuenta() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Cuenta"
                component={AccountScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="user" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen">
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
                <Stack.Screen name="Perfil" component={Cuenta} options={{ headerShown: true }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
