import auto from '../assets/rides/auto.png'
import uberBlack from '../assets/rides/uberBlack.png'
import uberBlackSuv from '../assets/rides/uberBlackSuv.png'
import uberSelect from '../assets/rides/uberSelect.png'
import Image from 'next/image'

import { useEffect, useState } from 'react'

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

const basePrice =80 

const RideSelector = () => {

    const [carList,setCarList] = useState([])


    useEffect(() => {
      ;(async () =>{
        try{

        }catch(error){
            const response=await fetch('api/db/getRideTypes')
            const data= await response.json()
            setCarList(data.data)
        }
      })
    }, [])
    
  return (
    <div className={style.wrapper}>
        <div className={style.title}>Choose a ride, or swipe up for more</div>
        <div className={style.carList}>
            {carList.map((car,index) => (
                <div className={style.car}>
                    <Image
                        src={car.iconUrl}
                        className={style.carImage}
                        height={50}
                        width={50}
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
    </div>
  )
}

export default RideSelector