import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState({});

 
   

    return (
        <UserContext.Provider
          value={{
            user
          }}>
          {children}
          </UserContext.Provider>
          )
}

export { UserProvider };
export default UserContext;