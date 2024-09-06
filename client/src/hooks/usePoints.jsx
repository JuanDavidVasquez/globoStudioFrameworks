import { useContext } from "react";
import PointContext from "../context/PointsProvider";


const usePoint = () =>{
    return useContext(PointContext)
}

export default usePoint;