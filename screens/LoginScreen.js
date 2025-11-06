// Componente de la pantalla de inicio de sesión.

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig.extra.apiUrl;
const API_URL = `${API_BASE_URL}/auth/login`;

const LoginScreen = ({ navigation }) => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // Nuevo estado para controlar si se muestra la contraseña (default: false)
  const [showPassword, setShowPassword] = useState(false);

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
      
      {/* 🟢 CAMBIO CLAVE 1: Aplicamos el estilo 'usernameInput' */}
      <TextInput
        style={styles.usernameInput} 
        placeholder="username"
        value={username}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      {/* Contenedor para la Contraseña (Input + Botón) */}
      <View style={styles.passwordContainer}> 
        <TextInput
          // 🟢 CAMBIO CLAVE 2: Aplicamos el nuevo estilo 'passwordTextInput'
          style={styles.passwordTextInput} 
          placeholder="Contraseña"
          secureTextEntry={!showPassword} 
          value={password}
          onChangeText={setPassword}
        />
        <Pressable
          style={styles.toggleButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.toggleText}>
            {showPassword ? '👁️' : '🔒'} 
          </Text>
        </Pressable>
      </View>

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

// ... (Estilos)
const styles = StyleSheet.create({
  // ... (Otros estilos)
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
  // 🟢 Nuevo estilo para el username (recupera el estilo original del input)
  usernameInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15, // Importante para separarlo del siguiente elemento
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },

  // 🔴 Contenedor de la contraseña
  passwordContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    // Aseguramos que este contenedor ocupe todo el ancho
    width: '100%', 
  },
  
  // 🟢 Nuevo estilo para el TextInput de la contraseña (con flex: 1)
  passwordTextInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    flex: 1, // Esto hace que el TextInput ocupe el espacio restante en el passwordContainer
  },
  
  // 🔴 Estilos del botón de alternancia (sin cambios)
  toggleButton: { 
    position: 'absolute', 
    right: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  toggleText: {
    fontSize: 20,
  }
});

export default LoginScreen;