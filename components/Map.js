import mapboxgl from 'mapbox-gl'
import { useEffect } from 'react'
const style= {
    wrapper:'flex-1 h-full w-full',

}

//need to set it up in the Vercel Environment Variable for safety, for now Hard coding it
//mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

mapboxgl.accessToken= 'pk.eyJ1Ijoia2lyaXRvYWZ0YWIiLCJhIjoiY2xmOXJtZ3VrMWR1NDN5cGNiNzN6eG5nNSJ9.dzEGKIGdXuimtnos0Y6MIg'

const Map = () => {

    useEffect(()=>{
        const map=new mapboxgl.Map({
            container:'map',
            style: 'mapbox://styles/kiritoaftab/clf9s30t000gh01pevrhhm9k9',
            center:[77.634367, 12.961151],
            zoom:8,
        })
    },[])

    return <div className={style.wrapper} id='map'></div>
}

export default Map