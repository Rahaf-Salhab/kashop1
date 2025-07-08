import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(0); 
  const [cartItemsList, setCartItemsList] = useState([]); 

  const getItems = async () => {
    const token = localStorage.getItem("userToken");
    try {
      const response = await axios.get(`https://mytshop.runasp.net/api/Carts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.cartResponse;
      setCartItemsList(data);           // حفظ قائمة المنتجات
      setCartItems(data.length);        // عدد المنتجات الفريدة
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, getItems, cartItemsList }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
