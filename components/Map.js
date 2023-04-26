import mapboxgl from 'mapbox-gl'
import { useEffect,useContext } from 'react'
import {stateContext} from '../context/stateContext'
import 'mapbox-gl/dist/mapbox-gl.css';

//need to set it up in the Vercel Environment Variable for safety, for now Hard coding it
//mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

mapboxgl.accessToken= 'pk.eyJ1Ijoia2lyaXRvYWZ0YWIiLCJhIjoiY2xmOXJtZ3VrMWR1NDN5cGNiNzN6eG5nNSJ9.dzEGKIGdXuimtnos0Y6MIg'

const Map = () => {
    const {pickupCoordinates,dropoffCoordinates} = useContext(stateContext)

    const style={
        wrapper:`w-full h-screen mb-6`
    }

    useEffect(()=>{
        const map=new mapboxgl.Map({
            container:'map',
            style: 'mapbox://styles/kiritoaftab/clf9s30t000gh01pevrhhm9k9',
            center:[77.634367, 12.961151],
            zoom:10,
        })

        if (pickupCoordinates) {
            addToMap(map, pickupCoordinates)
            }
    
            if (dropoffCoordinates){
            addToMap(map, dropoffCoordinates)
            }
    
            if (pickupCoordinates && dropoffCoordinates){
                try{
                map.fitBounds([dropoffCoordinates, pickupCoordinates], {
                padding: 80,
                })
            }catch(error){
                console.log(dropoffCoordinates,pickupCoordinates+" unable to fit in bounds please wait")
            }
            }

    },[pickupCoordinates,dropoffCoordinates])

        console.log(dropoffCoordinates,pickupCoordinates)

        const addToMap = (map, coordinates) => {
            try{
                const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
            }catch(error){
                console.log(coordinates+" cannot be marked rn")
            }
        
        }

    return <div className={style.wrapper}  id='map'></div>
}

export default Map