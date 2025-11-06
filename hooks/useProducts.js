//hooks: Aunque no es estrictamente necesario, para proyectos más complejos, podrías crear hooks personalizados.
//useProducts.js: Este hook podría manejar el estado de la lista de productos (products), la carga (isFetchingProducts)
//y las funciones para obtener, crear, modificar y eliminar productos. 
//Luego, AdminScreen.js simplemente llamaría a este hook para obtener toda la funcionalidad de una sola vez.

// hooks/useProducts.js
// Hook personalizado para manejar la lógica de la API de productos (CRUD). aun en prueba 13/08
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig.extra.apiUrl;
const API_PRODUCTS_URL = `${API_BASE_URL}/productos`;

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);

  // Función para obtener todos los productos de la API
  const fetchProducts = async () => {
    setIsFetchingProducts(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('No se encontró el token de autenticación.');
      }
      const response = await axios.get(API_PRODUCTS_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los productos.');
      console.error('Error al obtener los productos:', error.response?.data || error.message);
    } finally {
      setIsFetchingProducts(false);
    }
  };

  // Función para manejar la creación de un nuevo producto
  const handleCreateProduct = async ({ productName, productPrice }) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('No se encontró el token de autenticación.');
      }
      const response = await axios.post(
        API_PRODUCTS_URL,
        {
          nombre_producto: productName,
          precio_producto: parseFloat(productPrice),
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      
      Alert.alert('Éxito', 'Producto creado exitosamente.');
      fetchProducts(); // Refrescamos la lista de productos
      return response.data;
      
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el producto. Verifique su conexión y las credenciales.');
      console.error('Error al crear el producto:', error.response?.data || error.message);
      return null;
    }
  };

    // === NUEVA FUNCIÓN ===
  // Función para eliminar un producto por su ID
  const handleDeleteProduct = async (id_producto) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('No se encontró el token de autenticación.');
      }
      
      await axios.delete(`${API_PRODUCTS_URL}/${parseFloat(id_producto)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      Alert.alert('Éxito', `Producto con ID ${id_producto} eliminado.`);
      fetchProducts(); // Refresca la lista después de eliminar
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el producto');
      console.error('Error al eliminar el producto:', error.response?.data || error.message);
    }
  };


  // Efecto que se ejecuta una vez al montar el componente para obtener los productos
  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    isFetchingProducts,
    fetchProducts,
    handleCreateProduct,
    handleDeleteProduct
  };
};

export default useProducts;
