import { createContext, useState } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const UserContext = createContext();

const UserProvider = ({ children }) => {

  const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [myOrders, setMyOrders] = useState([]);

    const {auth} = useAuth();

    const getMyOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios(`/order-items/orders/${auth._id}` ,config);

        console.log(data);

        setMyOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/usuarios/usuarios", config);

        console.log(data);

        setUsers(data);
      } catch (error) {
        console.log(error);
    }
  };

  const updateUser = async (user) => {

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.put(`/usuarios/usuarios/${user.id}`, user, config);

      toast.success("Cuenta actualizada correctamente");

      setTimeout(() => {
        navigate("/home");
      }, 2000);


      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Error al actualizar cuenta");
    }
  };
 
   

    return (
        <UserContext.Provider
          value={{
            user,
            setUser,
            getMyOrders,
            myOrders,
            getUsers,
            users,
            updateUser,
          }}>
          {children}
          </UserContext.Provider>
          )
}

export { UserProvider };
export default UserContext;