//ProductList.js: Este componente sería responsable de mostrar la lista de productos. 
//Recibiría el array de productos como una prop y se encargaría de mapearlos para renderizar cada ProductItem

// components/products/ProductList.js
// Componente que muestra la lista de productos utilizando ProductItem.js

import React from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import ProductItem from './ProductItem';

const ProductList = ({ products, isFetchingProducts, onRefresh, onEdit, onDelete }) => {
  return (
    <View style={styles.productListSection}>
      <Text style={styles.sectionTitle}>Productos Existentes</Text>
      <Button title="Actualizar Productos" onPress={onRefresh} disabled={isFetchingProducts} />
      {isFetchingProducts ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
      ) : (
        <View style={styles.productsContainer}>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductItem 
                key={product.id_producto} 
                product={product}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <Text style={styles.noProductsText}>No hay productos registrados.</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  productListSection: {
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
  productsContainer: {
    marginTop: 10,
  },
  noProductsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#888',
    fontStyle: 'italic',
  }
});

export default ProductList;
