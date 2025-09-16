import React from 'react';
import { View, FlatList, Image } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';

const productos = [
  {
    id: '1',
    nombre: 'Camisa Blanca',
    precio: 29.99,
    imagen: require('../assets/camisa-blanca.jpg'),
  },
  {
    id: '2',
    nombre: 'Pantalón Negro',
    precio: 39.99,
    imagen: require('../assets/pantalon-negro.jpg'),
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <FlatList
      data={productos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Card style={{ margin: 10 }}>
          <Card.Cover source={item.imagen} />
          <Card.Title title={item.nombre} subtitle={`€${item.precio}`} />
          <Card.Actions>
            <Button onPress={() => navigation.navigate('Producto', { producto: item })}>
              Ver más
            </Button>
          </Card.Actions>
        </Card>
      )}
    />
  );
}
