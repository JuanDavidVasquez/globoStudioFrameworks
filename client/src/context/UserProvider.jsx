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

 
   

    return (
        <UserContext.Provider
          value={{
            user,
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