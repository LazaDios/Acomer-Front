import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminScreen = ({ navigation, route }) => {
  // Accedemos a los datos pasados por el parámetro 'userData'
  const { userData } = route.params;
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
      <Text style={styles.title}>Panel de Administrador</Text>
      <Text style={styles.text}>¡Bienvenido, Administrador!</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Datos del Usuario (JWT Decodificado):</Text>
          {/* Mostramos el objeto JSON completo */}
          <Text style={styles.cardText}>
            {JSON.stringify(userData, null, 2)}
          </Text>
        </View>


      {/* Aquí irá el contenido específico para el administrador */}
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'monospace',
  }
});



export default AdminScreen;