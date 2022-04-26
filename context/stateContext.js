import React, { createContext, useContext, useState, useEffect } from 'react';

import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  //   increment quntity
  const incrementQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  //   descrement quntity
  const decrementQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) {
        return 1;
      }
      return prevQty - 1;
    });
  };

  //   add item to cart
  const addToCart = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice((prevPrice) => prevPrice + product.price * quantity);
    setTotalQty((prevQty) => prevQty + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProd) => {
        if (cartProd._id === product._id) {
          return {
            ...cartProd,
            quantity: cartProd.quantity + quantity,
          };
        }
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to cart.`);
  };

  //   remove item from cart
  const removeFromCart = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQty((prevTotalQty) => prevTotalQty - foundProduct.quantity);
    setCartItems(newCartItems);
  };

  //   toggle item in cart
  const toggleCartItemQty = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.indexOf((product) => product._id === id);
    const newCartItem = cartItems.filter((item) => item._id !== id);

    if (value === 'increment') {
      let newCartItems = [
        ...newCartItem,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ];

      setCartItems(newCartItems);
      setTotalPrice((prevPrice) => prevPrice + foundProduct.price);
      setTotalQty((prevQty) => prevQty + 1);
    } else if (value === 'decrement') {
      if (foundProduct.quantity > 1) {
        let newCartItems = [
          ...newCartItem,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ];

        setCartItems(newCartItems);
        setTotalPrice((prevPrice) => prevPrice - foundProduct.price);
        setTotalQty((prevQty) => prevQty - 1);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQty,
        qty,
        incrementQty,
        decrementQty,
        addToCart,
        removeFromCart,
        toggleCartItemQty,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
