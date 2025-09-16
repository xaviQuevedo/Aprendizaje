import MainStack from "./navigation/MainStack";
import { CartProvider } from './context/CartContext';


export default function App() {
    return(
    <CartProvider>
        <MainStack />
    </CartProvider>
    );
}