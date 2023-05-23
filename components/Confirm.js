import RideSelector from '../components/RideSelector'
import { useContext } from 'react'
import {stateContext} from '../context/stateContext'
import {client} from '../sanityClient'
import { useEffect, useState } from 'react'

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
  
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [userId, setUserId] = useState(null);
  const {pickup,dropoff,currentAccount,basePrice,selectedRide, setConfirmRide, confirmRide, rideDetails,setRideDetails,pickupCoordinates,dropoffCoordinates} = useContext(stateContext)
  const [buttonText, setButtonText] = useState('Confirm P2P Ride');
    const testing = async(e) => {
      e.preventDefault();

      //disable the button
      e.target.disabled = true;

      if(!confirmRide)
      setConfirmRide(true);
      setButtonText('Waiting for driver to accept ride request');

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
        dropoff:dropoff,
        rideStatus: "pending"
      };

      if(rideDetails && rideDetails.carData && rideDetails.carData.service && rideDetails.carData.priceMultiplier){
        const response = await client.create(newDocument);
        setUserId(response._id);
        console.log(response)


        // const query = '*[_type == "comment" && authorId != $ownerId]'
        // const params = {ownerId: 'myUserId'}

        // const subscription = client.listen(query, params)
        //   .subscribe(update => {
        //     const comment = update.result
        //     console.log(`${comment.author} commented: ${comment.text}`)
        //   })




      }
      
    }

    let subscription, interval;

    useEffect(() => {
      console.log("useEffect")
      function getAlerts() {
        console.log("getAlerts")
        if (!isSubscribed) {
          clearInterval(interval);
          subscription.unsubscribe();}

        const query = `*[_type == 'ride']`;
        const params = {ownerId: userId}
        subscription = client
          .listen(query, params)
          .subscribe((update) => {
            if (update && update.result && update.result.rideStatus) {
              const { _id, rideStatus } = update.result;
              console.log(`Ride status update for document with ID ${_id}: ${rideStatus}`);
              if (rideStatus !== 'pending') {
                setIsSubscribed(false); // Stop checking for updates if status changes from 'pending'
                subscription.unsubscribe();
                
                //disable this button
                setButtonText(rideStatus);
              }
              // Handle the updated ride status as needed
            }
          });
        }
      getAlerts()
      interval = setInterval(() => getAlerts(), 5000)
      return () => {
        clearInterval(interval);
        subscription?.unsubscribe();

      }
  }, [])


    // useEffect(() => {
    //   console.log("userId")

  
    //   const interval = setInterval(() => {
    //     if (!isSubscribed) {
    //       clearInterval(interval);
    //       subscription.unsubscribe();
    //     }
    //   }, 5000);
  
    //   return () => {
    //     clearInterval(interval);
    //     subscription.unsubscribe();
    //   };
    // }, []);
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
            onClick={(e)=> testing(e)}
            >
                {buttonText} 
            </div>
        </div>
    </div>
  )
}

export default Confirm