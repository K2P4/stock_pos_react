import { createContext, useEffect, useState } from "react";

export const AllContext = createContext();

export const ContextProvider = ({ children }) => {
  const [success, setSuccess] = useState(false);
  const [loginCheck, setLogin] = useState(false);
  const [registerCheck, setRegister] = useState(false);
  const [logoutCheck, setLogout] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

   
  }, [cart]);

  const addToCart = (item, updateCheck = false) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                price: item.price,
                quantity: item.quantity,
              }
            : cartItem
        );
      } else {
        return [...prevCart, item];
      }
    });
  };

  const removeCart = (id) => {
    if (confirm("Are You Sure To Remove ?")) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }
  };

  const cartTotalAmount = Math.ceil(cart.reduce((total, item) => total + Number(item.price), 0));

  
  return (
    <AllContext.Provider
      value={{
        success,
        cartTotalAmount,
        setSuccess,
        removeCart,
        cart,
        setCart,
        addToCart,
        editSuccess,
        setEditSuccess,
        loginCheck,
        setLogin,
        registerCheck,
        setRegister,
        logoutCheck,
        setLogout,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
