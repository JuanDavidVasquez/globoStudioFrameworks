import { createContext, useState } from "react";

const HomeContext = createContext();

const HomeProvider = ({ children }) => {

    const [menuSidebar, setMenuSidebar] = useState('');

   

    return (
        <HomeContext.Provider
          value={{
            menuSidebar,
            setMenuSidebar,
          }}>
          {children}
          </HomeContext.Provider>
          )
}

export { HomeProvider };
export default HomeContext;