import { type } from "os";
import { createContext, useState, useEffect } from "react";
export const stateContext = createContext()
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

//TODO -- sort out the user name appearing next to Icon 

//importing abi files and contract addresses
import{RidePriceCalculatorAddress, RidePriceCalculatorAbi} from './context';


export const StateProvider = ({children}) => {
    const [pickup, setPickup] = useState('')
    const [dropoff, setDropoff] = useState('')
    const [pickupCoordinates, setPickupCoordinates] = useState()
    const [dropoffCoordinates, setDropoffCoordinates] = useState()
    const [currentAccount, setCurrentAccount] = useState()
    const [userName,setuserName] =useState("Aftab Ahmed")
    const [currentUser,setCurrentUser]=useState()
    const [price,setPrice] =useState()
    const [selectedRide,setSelectedRide]=useState()
    const [confirmRide,setConfirmRide]=useState(false)
    const [basePrice,setBasePrice]=useState(0)
    const [rideDetails,setRideDetails]=useState({})


    let metamask

    if(typeof window !== 'undefined'){
        metamask= window.ethereum 
    }

    useEffect(()=>{
        checkIfWalletIsConnected()
    },[]) 

    useEffect(()=>{
        if(!currentAccount) return
        requestToGetCurrentUserInfo(currentAccount)
    },[currentAccount]);

    function getDistance(lat1, lon1, lat2, lon2) {
        const EARTH_RADIUS = 6371000; // Earth's radius in meters
        const toRad = x => x * Math.PI / 180;
      
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const lat1Rad = toRad(lat1);
        const lat2Rad = toRad(lat2);
      
        const a =  Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2)
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = EARTH_RADIUS * c;
      
        return distance /500;
    };
      
    const calculatePrice = async (distance, speed) => {

        const provider = new ethers.providers.JsonRpcProvider(); // Replace with your Hardhat network URL
        console.log("Provider is: ", provider)
        const contract = new ethers.Contract(RidePriceCalculatorAddress, RidePriceCalculatorAbi, provider);
        // const timeInMinutes = 30;

        const price = await contract.calculateFare(distance, speed);
        console.log(price);

        // Print the calculated price to the console
        return price;

    }

    //calling calculatePrice function using useEffect

    if(confirmRide){

        let distance = getDistance(pickupCoordinates[1], pickupCoordinates[0], dropoffCoordinates[1], dropoffCoordinates[0]);
        console.log(distance);
        distance = parseInt(distance);
        console.log(distance);

        useEffect(async()=>{
            let temp = await calculatePrice(distance, 40);
            setBasePrice(temp);
            
        },[confirmRide]);

    }

    const checkIfWalletIsConnected = async () => {
        if(!window.ethereum) return 
        try{
            const addressArray = await window.etheruem.request({
                method: 'eth_accounts',
            })

            if(addressArray.length >0){
                setCurrentAccount(addressArray[0])
                requestToCreateUserOnSanity(addressArray[0])
            }
        }catch(error){
            console.error(error)
        }
    }

    const connectWallet = async () => {
        if(!window.ethereum) return
        try{
            const addressArray = await window.ethereum.request({
                method:'eth_requestAccounts'
            })
            if(addressArray.length >0){
                setCurrentAccount(addressArray[0])
                requestToCreateUserOnSanity(addressArray[0])
            }
        }catch(error){
            console.error(error)
        }
    }

    const createLocationCoordinatePromise = (locationName, locationType) => {
        return new Promise (async (resolve, reject) => {
            const response = await fetch('api/map/getLocationCoordinates', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                location: locationName,
                })
            })
            const data = await response.json()
    
            if (data.message = 'success') {
                switch (locationType) {
                case 'pickup':
                setPickupCoordinates (data.data)
                break
                case 'dropoff':
                setDropoffCoordinates (data.data)
                break
                }
                resolve()
             } else {
                reject()
            }
             })
        }   

    if(!confirmRide)
    useEffect (() => {
        if (pickup && dropoff) {
            ; (async () => {
            await Promise.all([
                createLocationCoordinatePromise(pickup, 'pickup'),
                createLocationCoordinatePromise(dropoff, 'dropoff')
                ])
            })()
          setConfirmRide(false)
        } else return
        }, [pickup, dropoff])

    
    const requestToCreateUserOnSanity = async address =>{
        if(!window.ethereum) return 
        try {
            await fetch('/api/db/createUser',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                    body: JSON.stringify({
                    userWalletAddress:address,
                    name:userName,

                })
            })
        } catch (error) {
            console.error(error)
        }
    }

    const requestToGetCurrentUserInfo = async walletAddress => {
        try {
            const response = await fetch(
                `/api/db/getUserInfo?walletAddress=${walletAddress}`
            )
            const data = await response.json()
            setCurrentUser(data.data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <stateContext.Provider
         value={{
            pickup,
            setPickup,
            dropoff,
            setDropoff,
            pickupCoordinates,
            setPickupCoordinates,
            dropoffCoordinates,
            setDropoffCoordinates,
            userName,
            setuserName,
            connectWallet,
            currentAccount,
            currentUser,
            price,
            selectedRide,
            setConfirmRide,
            confirmRide,
            basePrice,
            setBasePrice,
            rideDetails,
            setRideDetails
            }} >
                {children}
            </stateContext.Provider>
    )
}