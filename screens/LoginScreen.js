// Componente de la pantalla de inicio de sesión.



import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';


const API_URL = 'http://192.168.10.103:3000/api/v1/auth/login';

const LoginScreen = ({ navigation }) => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const isLoginDisabled = !username || !password;

  // Función que se llama al presionar el botón de login
  const handleLogin = async () => {
    // Evita múltiples peticiones si ya se está cargando
    if (loading) return;
    setLoading(true);

    try {
      // Petición POST a la API de NestJS
      const response = await axios.post(API_URL, {
        username,
        password,
      });

      // Se extrae el token de la respuesta
      const { access_token } = response.data;
      const decodedToken = jwtDecode(access_token);
      const userRole = decodedToken.id_usuario;

      // Guarda el token en el almacenamiento asíncrono
      await AsyncStorage.setItem('userToken', access_token);
      await AsyncStorage.setItem('userRole', userRole.toString());


      // Lógica de navegación según el rol
      let nextScreen;
      switch (userRole) {
        case 1:
          nextScreen = 'Admin';
          break;
        case 2:
          nextScreen = 'Mesonero';
          break;
        // Agrega el rol 3 (Cocinero) aquí en el futuro
        // case 3:
        //   nextScreen = 'Cocinero';
        //   break;
        default:
          nextScreen = 'Login'; // En caso de un rol no reconocido
          Alert.alert('Error', 'Rol de usuario no reconocido.');
          break;
      }
      // Reemplaza la pantalla actual con la pantalla correcta
      navigation.replace(nextScreen, { userData: decodedToken });

    } catch (error) {
      // Manejo de errores de la API
      Alert.alert('Error de Login', 'Credenciales inválidas. Por favor, inténtalo de nuevo.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="username"
        value={username}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Button 
          title="Login"
          onPress={handleLogin} 
          disabled={isLoginDisabled}
         />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
});

export default LoginScreen;