import { useEffect, useState } from 'react'
import auto from '../assets/rides/auto.png'
import uberBlack from '../assets/rides/uberBlack.png'
import uberBlackSuv from '../assets/rides/uberBlackSuv.png'
import uberSelect from '../assets/rides/uberSelect.png'
import Image from 'next/image'

import { useContext } from 'react'
import {stateContext} from '../context/stateContext'

const style = {
    wrapper: `h-full flex flex-col`,
    title: `text-gray-500 text-center text-xs py-2 border-b`,
    carList: `flex flex-col flex-1 overflow-scroll`,
    car: `flex p-3 m-2 items-center border-2 border-white`,
    selectedCar: `border-2 border-black flex p-3 m-2 items-center`,
    carImage: `h-14`,
    carDetails: `ml-2 flex-1`,
    service: `font-medium`,
    time: `text-xs text-blue-500`,
    priceContainer: `flex items-center`,
    price: `mr-[-0.8rem]`,
    hyperlink:`font-medium text-blue-600 dark:text-blue-500 hover:underline`,
    Btnwrapper: `flex-2 h-full flex flex-col justify-between`,
    rideSelectorContainer: `h-full flex flex-col overflow-scroll`,
    confirmButtonContainer: ` border-t-2 cursor-pointer z-10`,
    confirmButton: `bg-black text-white m-4 py-4 text-center text-xl`
  }
// const carList= [
//     {
//         service:'Auto',
//         iconUrl:auto,
//         priceMultiplier:1,
//         desc:'Suitable for 1-2 people'
//     },
//     {
//         service:'Hatchback',
//         iconUrl:uberSelect,
//         priceMultiplier:1.25,
//         desc:'Comfortable ride for 1-3 people'
//     },
//     {
//         service:'Sedan',
//         iconUrl:uberBlack,
//         priceMultiplier:1.5,
//         desc:'Amazing ride for upto 3 people '
//     },
//     {
//         service:'SUV',
//         iconUrl:uberBlackSuv,
//         priceMultiplier:1.75,
//         desc:'Comfortable ride for a large group of 5'
//     }
// ]
 


const RideSelector = () => {


  const {basePrice,setConfirmRide,rideDetails,setRideDetails} = useContext(stateContext);
  const [carList,setCarList] = useState([])

    useEffect(() => {
        ;(async () => {
          try {
            const response = await fetch('/api/db/getRideTypes')
    
            const data = await response.json()
            setCarList(data.data)
          } catch (error) {
            console.error(error)
          }
        })()
      }, [])
    
      const testing = () =>{
        setConfirmRide(true);
      }
function handleHover(e){
  console.log(e+" was selected")
}

const [hoveredItem, setHoveredItem] = useState(null);

  const handleItemHover = (index) => {
    setHoveredItem(index);
    
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
  };
  useEffect(() => {
    
  
    return () => {
      console.log(rideDetails?.carData?.service+" from ride selector component -- car Data")
    }
  }, [rideDetails])
  
  const  handleItemClick= async (index)=>{
    
    console.log(index+" was selected")
    await setRideDetails({
      'carData':carList[index]
    })
    
  }
  return (
    <div className={style.wrapper}>
        <div className={style.title}>Choose a ride, or swipe up for more <span className={style.hyperlink} onClick={()=> testing()}>Get Ride Prices</span></div>
        <div className={style.carList}>
            {carList.map((car,index) => (
                <div key={index}
                className={index === hoveredItem ? `flex p-3 m-2 items-center border-2 border-white bg-slate-300` : `flex p-3 m-2 items-center border-2 border-white`}
                onMouseEnter={() => handleItemHover(index)}
                onMouseLeave={handleItemLeave}
                onClick={()=> handleItemClick(index)}
                >
                    <Image
                        src={car.iconUrl}
                        className={style.carImage}
                        height={50}
                        width={50}
                        unoptimized={true}
                    />
                    <div className={style.carDetails}>
                        <div className={style.service}>{car.service}</div>
                        <div className={style.desc}>{car.desc}</div>
                        <div className={style.time}>5 mins away</div>     
                    </div> 
                    <div className={style.priceContainer}>
                        <div className={style.price}>
                           Rs. {((basePrice * car.priceMultiplier).toFixed(2))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div>
        
        </div>
    </div>
  )
}

export default RideSelector