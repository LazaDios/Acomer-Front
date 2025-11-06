//ProductItem.js: Un componente más pequeño que renderiza la información de un solo producto (nombre, precio) 
//y podría incluir los botones de "Modificar" y "Eliminar".

// components/products/ProductItem.js
// Componente que muestra un solo producto e incluye botones de acción.

// components/products/ProductItem.js
// Componente que muestra un solo producto e incluye botones de acción.

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProductItem = ({ product, onEdit, onDelete }) => {
  // === PASO DE DEPURACIÓN ===
  // Esta línea mostrará el objeto del producto en tu terminal o en la consola del navegador.
  console.log('Producto recibido:', product);
  
  return (
    <View style={styles.productItem}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.nombre_producto}</Text>
        {/*
          Corrección: Se añade una validación para asegurarnos de que precio_producto
          existe antes de llamar a toFixed(). Si no existe, se muestra '0.00'
        */}
        <Text style={styles.productPrice}>${product.precio_producto ? parseFloat(product.precio_producto).toFixed(2) : '0.00'}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {/* Botón para modificar el producto */}
        <Button
          title="Modificar"
          onPress={() => onEdit(product.id_productos)}
          color="#ffc107"
        />
        {/* Botón para eliminar el producto */}
        <Button
          title="Eliminar"
          onPress={() => onDelete(product.id_productos)}
          color="#dc3545"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productInfo: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
  },
});

export default ProductItem;