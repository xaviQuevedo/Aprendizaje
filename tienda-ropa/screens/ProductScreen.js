// screens/ProductScreen.js
import React, { useContext } from 'react';
import { View, Image } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { CartContext } from '../context/CartContext';

export default function ProductScreen({ route }) {
  const { producto } = route.params;
  const { addToCart } = useContext(CartContext);

  return (
    <View style={{ margin: 20 }}>
      <Card>
        <Card.Cover source={producto.imagen} />
        <Card.Title title={producto.nombre} subtitle={`€${producto.precio}`} />
        <Card.Actions>
          <Button onPress={() => addToCart(producto)}>Agregar al carrito</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
