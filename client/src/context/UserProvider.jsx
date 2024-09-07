import { createContext, useState } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/clienteAxios";

const UserContext = createContext();

const UserProvider = ({ children }) => {

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
      const { data } = await clienteAxios.put(`/usuarios/usuarios/${user._id}`, user, config);

      console.log(data);

      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (error) {
      console.log(error);
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
          }}>
          {children}
          </UserContext.Provider>
          )
}

export { UserProvider };
export default UserContext;