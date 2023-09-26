/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer, useState } from "react";

const URL='http://localhost:8000';

const CitesContex=createContext();


const initialState={
  cities:[],
  isLoading:false,
  currentCity:{},
  error:"",
}

function reducer(state,action){
  switch(action.type){

    case 'loading':
      return {
        ...state, isLoading:true
      }
    case 'cities/loaded':
      return {
        ...state, isLoading:false, cities:action.payload
      }
    
    case 'city/loaded':
      return {...state,isLoading:false,currentCity:action.payload}

    case 'city/created':
      return {...state,isLoading:false,cities:[...state.cities,action.payload],currentCity:action.payload}

    case 'city/deleted':
      return {
        ...state, isLoading:false, cities:state.cities.filter((city)=>city.id !==action.payload),currentCity:{},
      }

    case "rejected":
      return {
        ...state, isLoading:false, error:action.payload
      }

    default: throw new Error("Unknown action type")

  }
}
function CitiesProvider({children}) {

  const [{cities,isLoading,currentCity,error},dispatch]=useReducer(reducer,initialState)
  // const [cities,setCities]=useState([]);
  // const [isLoading, setIsLoading]=useState(false);
  // const [currentCity,setCurrentCity]=useState({});



  useEffect(function(){
      async function fetchCities(){
        dispatch({type:"loading"})
        try{
        const res=await fetch(`${URL}/cities`);
        const data=await res.json();
        dispatch({type:'cities/loaded',payload:data})
        }catch{
          dispatch({type:"rejected",payload:"there was error in loading cities"})
        }
      }
      fetchCities();
  },[])



  async function getCity(id){

    if(Number(id)===currentCity.id) return;
    dispatch({type:'loading'});
      try{

      const res=await fetch(`${URL}/cities/${id}`);
      const data=await res.json();
      dispatch({
        type:"city/loaded",
        payload:data,
      })
    
      }catch{
        dispatch({type:"rejected",payload:"there was error in loading cities"})
       
      }
    }

   async function createCity(newCity){
    dispatch({type:'loading'});

    try{
      
      const res = await fetch(`${URL}/cities`,{
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type':'application/json'
        },

      });
      const data=await res.json();
      // console.log(data)
      dispatch({type:"city/created",payload:data})
      
    }catch{
      dispatch({type:"rejected",payload:"there was error in creating cities"})

    }
   }

   async function deleteCity(id){
    dispatch({type:'loading'});

    try{
    
      await fetch(`${URL}/cities/${id}`,{
        method: 'DELETE',
      });
     
      dispatch({type:"city/deleted",payload:id})
      
    }catch{
      dispatch({type:"rejected",payload:"there was error in loading cities"})

    }
   }

 
  


  return (
   <CitesContex.Provider value={
    {cities,isLoading,currentCity,getCity,createCity,deleteCity,error}
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
