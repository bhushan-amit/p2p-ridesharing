import RideSelector from '../components/RideSelector'
import { useContext } from 'react'
import {stateContext} from '../context/stateContext'

const style = {
    wrapper: `flex-2 h-full flex flex-col justify-between`,
    rideSelectorContainer: `h-full flex flex-col overflow-scroll`,
    confirmButtonContainer: ` border-t-2 cursor-pointer z-10`,
    confirmButton: `bg-black text-white m-4 py-4 text-center text-xl`,
  }

const Confirm = () => {

  const {pickup,dropoff,currentAccount,price,selectedRide, setConfirmRide, confirmRide} = useContext(stateContext)

    const testing = async() => {
      
      if(!confirmRide)
      setConfirmRide(true);

    }

    const storeTripDetails = async(pickup,dropoff) => {
      try {
        await fetch('/api/db/saveTrips',{
          method:"POST",
          headers:{
            "Content-Type":'application/json'
          },
          body:JSON.stringify({
            pickupLocation:pickup,
            dropoffLocation:dropoff,
            userWalletAddress:currentAccount,
            price:price,
            selectedRide:selectedRide,
          })
        })
      } catch (error) {
        console.error(error)
      }
    }

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