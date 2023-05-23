import RideSelector from '../components/RideSelector'
import { useContext } from 'react'
import {stateContext} from '../context/stateContext'
import {client} from '../sanityClient'

const style = {
    wrapper: `flex-2 h-full flex flex-col justify-between`,
    rideSelectorContainer: `h-full flex flex-col overflow-scroll`,
    confirmButtonContainer: ` border-t-2 cursor-pointer z-10`,
    confirmButton: `bg-black text-white m-4 py-4 text-center text-xl`,
  }

const Confirm = () => {
  function getCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
  
    const currentTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    return currentTime;
  }
  
  
  const {pickup,dropoff,currentAccount,basePrice,selectedRide, setConfirmRide, confirmRide, rideDetails,setRideDetails,pickupCoordinates,dropoffCoordinates} = useContext(stateContext)

    const testing = async() => {
      if(!confirmRide)
      setConfirmRide(true);

      //data pack karo aur send maaro 
      console.log(JSON.stringify(rideDetails))
      const newDocument = {
        _type: 'ride',
        name: 'Aftab Ahmed',
        pickupCoordinate: {
          lat: pickupCoordinates[0], // Example latitude value
          lng: pickupCoordinates[1], // Example longitude value
        },
        dropoffCoordinate: {
          lat: dropoffCoordinates[0], // Example latitude value
          lng: dropoffCoordinates[1], // Example longitude value
        },
        time:getCurrentTime()+" ",
        price:basePrice*rideDetails?.carData?.priceMultiplier,
        carType: rideDetails?.carData?.service,
        pickup:pickup,
        dropoff:dropoff
      };

      if(rideDetails && rideDetails.carData && rideDetails.carData.service && rideDetails.carData.priceMultiplier){
        const response = await client.create(newDocument);
        console.log(response)
      }
      
    }

    // const storeTripDetails = async(pickup,dropoff) => {
    //   try {
    //     await fetch('/api/db/saveTrips',{
    //       method:"POST",
    //       headers:{
    //         "Content-Type":'application/json'
    //       },
    //       body:JSON.stringify({
    //         pickupLocation:pickup,
    //         dropoffLocation:dropoff,
    //         userWalletAddress:currentAccount,
    //         price:price,
    //         selectedRide:selectedRide,
    //       })
    //     })
    //   } catch (error) {
    //     console.error(error)
    //   }
    // }

  return (
    <div className={style.wrapper}>
        <div className={style.rideSelectorContainer}> 
            <RideSelector/>
        </div>
        <div className={style.confirmButtonContainer}>
            <div 
            className={style.confirmButton}
            onClick={()=> testing()}
            >
                Confirm P2P Ride 
            </div>
        </div>
    </div>
  )
}

export default Confirm