import { createContext, useState } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/clienteAxios";

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState({});
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

 
   

    return (
        <UserContext.Provider
          value={{
            user,
            getMyOrders,
            myOrders
          }}>
          {children}
          </UserContext.Provider>
          )
}

export { UserProvider };
export default UserContext;