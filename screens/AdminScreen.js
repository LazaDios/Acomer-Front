// screens/AdminScreen.js
// Esta pantalla actúa como un contenedor que organiza los componentes del panel de administración.

import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductForm from '../components/products/ProductForm';
import ProductList from '../components/products/ProductList';
import useProducts from '../hooks/useProducts';

const AdminScreen = ({ navigation }) => {
  // Usamos el hook personalizado para manejar toda la lógica CRUD de los productos
  const { products, isFetchingProducts, handleCreateProduct, fetchProducts, handleDeleteProduct } = useProducts();

  // Función para cerrar la sesión del usuario
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userRole');
      navigation.replace('Login');
    } catch (e) {
      console.error('Logout error :', e);
    }
  };

    // Función para manejar la eliminación con una confirmación
  const handleDelete = (productId) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que quieres eliminar este producto?",
      [
        {
          text: "cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () => handleDeleteProduct(productId),
          style: "destructive"
        }
      ]
    );
  };

   return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Panel de Administración</Text>
        <Text style={styles.text}>¡Bienvenido, Administrador!</Text>
        
        {/* Componente para el formulario de creación de productos */}
        <ProductForm onSubmit={handleCreateProduct} />

        {/* Componente para mostrar la lista de productos */}
        <ProductList 
          products={products}
          isFetchingProducts={isFetchingProducts}
          onRefresh={fetchProducts}
          //onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Button title="Cerrar Sesión" onPress={handleLogout} color="#dc3545" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
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

export default AdminScreen;
