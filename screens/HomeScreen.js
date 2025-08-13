// screens/HomeScreen.js
// Componente de la pantalla principal después del inicio de sesión.

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  // Función para cerrar la sesión del usuario
  const handleLogout = async () => {
    try {
      // Elimina el token del almacenamiento
      await AsyncStorage.removeItem('userToken');
      // Reemplaza la pantalla actual con la de Login, para que no pueda volver atrás
      navigation.replace('Login');
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <Text style={styles.text}>Has iniciado sesión correctamente en la aplicación.</Text>
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
});

export default HomeScreen;