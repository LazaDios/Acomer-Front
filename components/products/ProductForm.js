//ProductForm.js: Este componente se encargaría únicamente de la interfaz del formulario para crear o editar un producto
//(campos de texto y botón de guardar). Tendría su propio estado para los campos y 
// recibiría una función onSubmit como prop para manejar la lógica de la API

// components/products/ProductForm.js
// Componente de formulario para crear un nuevo producto.

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';

const ProductForm = ({ onSubmit }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // La lógica de validación se mantiene aquí para la UI
    if (!productName.trim() || !productPrice.trim()) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);
    await onSubmit({ productName, productPrice }); // Llama a la función del hook
    setLoading(false);
    
    // Limpiamos los campos
    setProductName('');
    setProductPrice('');
  };

  return (
    <View style={styles.createProductSection}>
      <Text style={styles.sectionTitle}>Crear Nuevo Producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio del producto"
        value={productPrice}
        onChangeText={setProductPrice}
        keyboardType="numeric"
      />
      {loading ? (
        <ActivityIndicator size="small" color="#007bff" />
      ) : (
        <Button title="Guardar Producto" onPress={handleSubmit} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  createProductSection: {
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
    padding: 15,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});

export default ProductForm;
