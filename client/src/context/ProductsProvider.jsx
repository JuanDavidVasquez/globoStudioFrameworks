import { createContext, useState } from "react";
import clienteAxios from "../config/clienteAxios";

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/productos", config);

      setProducts(data); 
      

    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/categorias", config);

      setCategories(data); 
      

    } catch (error) {
      console.log(error);
    }
  }



    return (
      <ProductsContext.Provider
        value={{
          products,
          getProducts,

          getCategories,
          categories,
        }}
      >
        {children}
      </ProductsContext.Provider>
    );
  };


export { ProductsProvider };
export default ProductsContext;
