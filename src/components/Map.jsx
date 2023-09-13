/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
function Map() {
  const navigate=useNavigate()
 const[searchParams, setSearchParams]= useSearchParams()
 const lat=searchParams.get("lat");
 const lng=searchParams.get("lng");
  return (
    <>
    <div className={styles.mapContainer} onClick={()=>{navigate('form')}}>
      <h1>Map</h1>
      <h1>position {lat}, {lng} </h1>
    </div>

    <button onClick={()=>setSearchParams({lat:23,lng:50})}> chage pos</button>
    </>
  )
}

export default Map

