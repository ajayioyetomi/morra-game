import { useContext } from "react";
import {AppContext} from '../context';

export const useReach = () =>{
    return useContext(AppContext);
}