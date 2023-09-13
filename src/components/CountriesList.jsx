/* eslint-disable react/prop-types */
import styles from './CountriesList.module.css'
import Spinner from '../components/Spinner'
import Message from '../components/Message';
import CountryItem from '../components/CountryItem'


function CountriesList({isLoading, cities}) {
  if(isLoading) return <Spinner/>
  if(!cities.length) return <Message message="Add your First city by clicking on a city"/>


  const countries=cities.reduce(
    (arr,city)=>{
      if(!arr.map(el=>el.country).includes(city.country)) return [...arr, {country:city.country,emoji:city.emoji}]
      else return arr;
    },[]
  )


  return (
   <ul className={styles.countryList}>
     {countries.map(coutry=><CountryItem country={coutry} key={coutry}/>)}
   </ul>
  )
}

export default CountriesList;
