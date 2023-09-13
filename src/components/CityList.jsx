/* eslint-disable react/prop-types */
import styles from './CityList.module.css'
import Spinner from '../components/Spinner'
import CityItem from './CityItem'
import Message from '../components/Message';


function CityList({isLoading, cities}) {
  if(isLoading) return <Spinner/>
  if(!cities.length) return <Message message="Add your First city by clicking on a city"/>

  return (
   <ul className={styles.cityList}>
     {cities.map(city=><CityItem city={city} key={city.id}/>)}
   </ul>
  )
}

export default CityList
