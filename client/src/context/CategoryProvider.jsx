import { createContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import clienteAxios from "../config/clienteAxios";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {

   const [categories, setCategories] = useState([]);
   const [category, setCategory] = useState({});

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

      const {data} = await clienteAxios.get("/categorias", config);
      
      setCategories(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Error al cargar categories");
    }
   };

   const createCategory = async (category) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) return;
  
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

      const {data} = await clienteAxios.post("/categorias/new-categoria", category, config);
      
      setCategories([...categories, data]);
      toast.success("Category created successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Error creating category");
    }
   };

   const updateCategory = async (category) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Actualizar la categoría en el servidor
      const { data } = await clienteAxios.put(`/categorias/${category.id}`, category, config);
  
      // Actualizar el estado local con los datos actualizados
      setCategories(prevCategories => 
        prevCategories.map(cat => cat.id === category.id ? data : cat)
      );
  
      // Opcional: Recargar las categorías desde el servidor para asegurar que el estado esté sincronizado
      await getCategories();
  
      toast.success("Category updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Error updating category");
    }
  };
  

   const deleteCategory = async (id) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) return;
  
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

      await clienteAxios.delete(`/categorias/${id}`, config);
      
      const newCategories = categories.filter((cat) => cat.id !== id);
      setCategory(newCategories);
      toast.success("Category deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Error deleting category");
   };
}
   

    return (
        <CategoryContext.Provider
          value={{
            categories,
            setCategories,
            getCategories,
            createCategory,
            category,
            updateCategory,
            deleteCategory,
          }}>
          {children}
          </CategoryContext.Provider>
          )
}

export { CategoryProvider };
export default CategoryContext;