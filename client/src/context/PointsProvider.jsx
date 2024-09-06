import { createContext, useState } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/clienteAxios";

const PointContext = createContext();

const PointProvider = ({ children }) => {

    const [points, setPoints] = useState({});

    const {auth} = useAuth();

    const getPoints = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) return;
  
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const { data } = await clienteAxios(`/points/${auth._id}` ,config);
  
          console.log(data);
  
          setPoints(data);
        } catch (error) {
          console.log(error);
        }
      };

   

    return (
        <PointContext.Provider
          value={{
            points,
            getPoints,
          }}>
          {children}
          </PointContext.Provider>
          )
}

export { PointProvider };
export default PointContext;