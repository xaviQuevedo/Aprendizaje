import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (producto) => {
        setCartItems([...cartItems, producto]);
    };

    return (
        <CartContext.Provider value= {{cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}