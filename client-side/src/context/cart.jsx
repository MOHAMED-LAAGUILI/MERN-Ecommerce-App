import PropTypes from 'prop-types';
import { createContext, useContext, useState, useEffect } from 'react';

// Retrieve cart from localStorage
const getLocalCart = () => {
  const localCart = localStorage.getItem('cart');
  return localCart ? JSON.parse(localCart) : [];
};

// Cart context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getLocalCart());

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);


CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
