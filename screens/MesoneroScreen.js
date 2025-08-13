// screens/MesoneroScreen.js
// Esta es la pantalla principal para los usuarios con el rol de Mesonero (rol 2).

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MesoneroScreen = ({ navigation }) => {
  // Función para cerrar la sesión del usuario
  const handleLogout = async () => {
    try {
      // Elimina el token y el rol del almacenamiento
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userRole');
      // Reemplaza la pantalla actual con la de Login
      navigation.replace('Login');
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Mesonero</Text>
      <Text style={styles.text}>¡Bienvenido, Mesonero!</Text>
      {/* Aquí irá el contenido específico para el mesonero */}
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

export default MesoneroScreen;