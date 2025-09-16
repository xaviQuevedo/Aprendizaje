import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';

const Stack = createNativeStackNavigator();

export default function MainStack(){
    return (
        <NavigationContainer> 
            <Stack.Navigator>
                <Stack.Screen name="Inicio" component={HomeScreen} />
                <Stack.Screen name="Producto" component={ProductScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}