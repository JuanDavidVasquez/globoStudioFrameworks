import { useContext } from "react";
import HomeContext from "../context/HomeProvider";

const useHome = () =>{
    return useContext(HomeContext)
}

export default useHome;