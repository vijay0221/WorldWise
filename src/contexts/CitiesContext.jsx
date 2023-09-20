/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const URL='http://localhost:8000';

const CitesContex=createContext();
function CitiesProvider({children}) {
  const [cities,setCities]=useState([]);
  const [isLoading, setIsLoading]=useState(false);
  const [currentCity,setCurrentCity]=useState({});


  useEffect(function(){
      async function fetchCities(){
        try{
          setIsLoading(true)
        const res=await fetch(`${URL}/cities`);
        const data=await res.json();
        setCities(data);
        }catch{
          alert("there was error in loading cities")
        }finally{
          setIsLoading(false)
        }
      }
      fetchCities();
  },[])



  async function getCity(id){
      try{
        setIsLoading(true)
      const res=await fetch(`${URL}/cities/${id}`);
      const data=await res.json();
      setCurrentCity(data);
      }catch{
        alert("there was error in loading cities")
      }finally{
        setIsLoading(false)
      }
    }

    async function createCity(newCity){
      try{
        setIsLoading(true)
      const res=await fetch(`${URL}/cities`,{
        method:"POST",
        body:JSON.stringify(newCity),
        headers:{
          "Content-Type":"application/json"
        },
      });
      const data=await res.json();
       
      setCities((cities)=>[...cities,data])
      }catch{
        alert("there was error in loading cities")
      }finally{
        setIsLoading(false)
      }
    }
  


  return (
   <CitesContex.Provider value={
    {cities,isLoading,currentCity,getCity,createCity}
    }>

     {children}
   </CitesContex.Provider>
  )
}

function useCities(){
  const context=useContext(CitesContex);
  if(context===undefined) return;
  return context;
}

export  {CitiesProvider,useCities}
