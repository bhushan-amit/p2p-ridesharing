import React,{useContext,useEffect} from 'react'
import {stateContext} from '../context/stateContext'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken= 'pk.eyJ1Ijoia2lyaXRvYWZ0YWIiLCJhIjoiY2xmOXJtZ3VrMWR1NDN5cGNiNzN6eG5nNSJ9.dzEGKIGdXuimtnos0Y6MIg'
import RideList from './RideList'
function Driver() {
  const {pickupCoordinates,dropoffCoordinates} = useContext(stateContext)

  const style={
      wrapper:`w-full h-screen mb-6`
  }
   


      console.log(dropoffCoordinates,pickupCoordinates)

      const addToMap = (map, coordinates) => {
          try{
              const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
          }catch(error){
              console.log(coordinates+" cannot be marked rn")
              console.log(error)
          }
      
      }

      const addingToMap = (mapData)=>{
        const map=new mapboxgl.Map({
          container:'map',
          style: 'mapbox://styles/kiritoaftab/clf9s30t000gh01pevrhhm9k9',
          center:[77.634367, 12.961151],
          zoom:10,
      })
        console.log(mapData)
        addToMap(map,[mapData[0],mapData[1]]) //pickup
        addToMap(map,[mapData[2],mapData[3]]) //dropoff 
      }
  return (
    <div className='grid grid-cols-2 gap-2'>
        <div><RideList addingToMap={addingToMap}/></div>
        <div id='map' className={style.wrapper}></div>
    </div>
  )
}

export default Driver