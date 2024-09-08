import { createContext, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
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
      console.log(data);

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

  const createProduct = async (product) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) return;
  
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

      const {data} = await clienteAxios.post("/productos/new-producto", product, config);
      
      setProducts([...products, data]);
      toast.success("Product created successfully");
      console.log(products);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Error creating product");
    }
   };

   const updateProduct = async (product) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) return;
  
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

      const {data} = await clienteAxios.put(`/productos/${product.id}`, product, config);
      
      const newProducts = products.map((prod) => (prod._id === data._id ? data : prod));
      setProducts(newProducts);
      toast.success("Product updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Error updating product");
    }
   };

   const deleteProduct = async (product) => {
    console.log(product);
    try {
        const token = localStorage.getItem("token");
        if (!token) return;
  
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

      await clienteAxios.delete(`/productos/${product}`, config);
      
      const newProducts = products.filter((prod) => prod._id !== product._id);
      setProducts(newProducts);
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Error deleting product");
   };
  };


    return (
      <ProductsContext.Provider
        value={{
          createProduct,
          product,
          products,
          getProducts,
          getCategories,
          categories,
          updateProduct,
          deleteProduct,
        }}
      >
        {children}
      </ProductsContext.Provider>
    );
  };


export { ProductsProvider };
export default ProductsContext;
