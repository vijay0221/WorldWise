/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPostion } from "../hooks/useUrlPosition";
import Message from "../components/Message"
import Spinner from "../components/Spinner"
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
 const [Lat,Lng]=useUrlPostion();
//  console.log(mapLat,mapLng)

const {createCity}=useCities();

  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji,setEmoji]=useState("");
  const [geoCodingError, setGeoCodingError]=useState("")

const [isLoadingGeoCoding,setIsLoadingGeoCoding]=useState(false)


  useEffect(function(){
    if(!Lat && !Lng) return;
    
  async function fetchCityData(){
    try{
      setGeoCodingError('')
      setIsLoadingGeoCoding(true)
      const res= await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${Lat}&longitude=${Lng}`)
      const data= await res.json();
      console.log(data)
      if(!data.countryCode)throw new Error(
        "That doesn't seem to be a city . Click somewhere else."
      )
      setCityName(data.city || data.locality || "")
      setCountry(data.countryName)
      setEmoji(convertToEmoji(data.countryCode))
    }catch(err){
       setGeoCodingError(err.message)
    }finally{
      setIsLoadingGeoCoding(false)
    }
  }
  fetchCityData();
  },[Lat,Lng])

  function handleSubmit(e){
    e.preventDefault();
    if(!cityName || !date) return;
    const newCity={
      cityName,
      country,
      emoji,
      date,
      notes,
      position:{Lat, Lng},
    }
    createCity(newCity)
    // console.log(newCity)


  }
   if(isLoadingGeoCoding) return <Spinner/>

   if(!Lat && !Lng) return <Message message="Start by clicking somewhere on the Map"/>
  if(geoCodingError) return <Message message={geoCodingError}/>
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <ReactDatePicker onChange={(date) => setDate(date)} selected={date} dateFormat='dd/MM/yyyy' id="Date"/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button type="back" onClick={(e)=>{
          e.preventDefault();
          navigate(-1)}}>&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
