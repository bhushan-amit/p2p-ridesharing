import React, { useEffect, useState } from 'react';
import {client} from '../sanityClient';

const RideList = ({addingToMap}) => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const query = `*[_type == "ride"]`;
        const result = await client.fetch(query);
        setRides(result);
      } catch (error) {
        console.error('Error fetching rides:', error);
      }
    };

    fetchRides();
  }, []);

  const handleAcceptRide = async (rideId) => {
    console.log(rideId)
    try {
      const update = {
        rideStatus: 'accepted',
      };

      const temp = await client.patch(rideId).set(update).commit();
      console.log(temp)
      // Update the local state after successful update
      setRides((prevRides) =>
        prevRides.map((ride) =>
          ride._id === rideId ? { ...ride, rideStatus: 'accepted' } : ride
        )
      );
    } catch (error) {
      console.error('Error accepting ride:', error);
    }
  };

  const handleRejectRide = async (rideId) => {
    console.log(rideId)
    try {
      const update = {
        rideStatus: 'rejected',
      };

      await client.patch(rideId).set(update).commit();
      // Update the local state after successful update
      setRides((prevRides) =>
        prevRides.map((ride) =>
          ride._id === rideId ? { ...ride, rideStatus: 'rejected' } : ride
        )
      );
    } catch (error) {
      console.error('Error rejecting ride:', error);
    }
  };
  const renderMap= async (p1,p2,l1,l2) => {
    await addingToMap([p1,p2,l1,l2])
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ride Requests</h1>
      {rides.length === 0 ? (
        <p>No ride requests found.</p>
      ) : (
        <ul>
          {rides.map((ride) => (
          <div key={ride._id} className="p-4 mb-4 bg-gray-200" onClick={() => renderMap(ride?.pickupCoordinate?.lat,ride?.pickupCoordinate?.lng,ride?.dropoffCoordinate?.lat,ride?.dropoffCoordinate?.lng)}>
          <h2 className="text-lg font-semibold">{ride.name}</h2>
          <p>Pickup Location: {ride.pickup}</p>
          <p>Drop-off Location: {ride.dropoff}</p>
          <p>Time: {ride.time}</p>
          <p>Price: {ride.price}</p>
          <p>Car Type: {ride.carType}</p>

                <div>
                  {
                  ride.rideStatus === 'pending'? 
                    <>
                      <button
                        className="bg-green-500 text-white py-2 px-4 rounded-md mr-2"
                        onClick={() => handleAcceptRide(ride._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded-md"
                        onClick={() => handleRejectRide(ride._id)}
                      >
                        Reject
                      </button>
                    </>
                  
                   :<p className="text-gray-500">{ride.rideStatus}</p>
                  }
                </div>
              </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RideList;
