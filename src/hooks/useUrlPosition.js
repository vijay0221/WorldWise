/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";

export function useUrlPostion(){
  const[searchParams]= useSearchParams()
  const Lat=searchParams.get("lat");
  const Lng=searchParams.get("lng");
 
  return [Lat,Lng]
}

