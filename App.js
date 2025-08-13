// Archivo principal de la aplicación que maneja la navegación y el estado de autenticación.
import 'react-native-gesture-handler'; 
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, Text } from 'react-native';

// Importa las pantallas que creaste
import LoginScreen from './screens/LoginScreen';
//import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';
import MesoneroScreen from './screens/MesoneroScreen';
// import CocineroScreen from './screens/CocineroScreen';


// Crea un "Stack Navigator" para la navegación
const Stack = createStackNavigator();

const App = () => {
  // Estado para saber si la aplicación está cargando (verificando el token)
  const [isLoading, setIsLoading] = useState(true);
  // Estado para almacenar el token de usuario
  const [userToken, setUserToken] = useState(null);
  // Estado para almacenar el rol de usuario
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Función asíncrona para verificar si existe un token en el almacenamiento
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const role = await AsyncStorage.getItem('userRole');
        // Si hay un token, lo guarda en el estado
        setUserToken(token);
        setUserRole(role);
      } catch (e) {
        // Manejo de errores en caso de que falle la lectura del token
        console.error('Failed to load token:', e);
      } finally {
        // Establece isLoading a falso una vez que la verificación ha terminado
        setIsLoading(false);
      }
    };

    checkToken();
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

  // Muestra un indicador de carga mientras se verifica el token
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Cargando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* Registramos ambas pantallas permanentemente. */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        {/* Aquí irán las pantallas de Mesonero y Cocinero en el futuro */}
        <Stack.Screen name="Mesonero" component={MesoneroScreen} />
        {/* <Stack.Screen name="Cocinero" component={CocineroScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
