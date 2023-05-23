import React, { useState, useEffect } from 'react';
import {client} from '../sanityClient';

export const fetchDocuments = async () => {
  const query = '*[_type == "ride"]';
  const response = await client.fetch(query);

  return response;
};

const RideList = ({addingToMap}) => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDocuments();
        setDocuments(result);
        setIsLoading(false);
      } catch (error) {
        console.error('Error occurred while fetching documents:', error);
        setIsError(true);
        setIsLoading(false);
    
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching documents.</div>;
  }

  const renderMap= async (p1,p2,l1,l2) => {
    await addingToMap([p1,p2,l1,l2])
  }
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ride List</h1>
      {documents.map((document) => (
        <div key={document._id} className="p-4 mb-4 bg-gray-200" onClick={() => renderMap(document?.pickupCoordinate?.lat,document?.pickupCoordinate?.lng,document?.dropoffCoordinate?.lat,document?.dropoffCoordinate?.lng)}>
          <h2 className="text-lg font-semibold">{document.name}</h2>
          <p>Pickup Location: {document.pickup}</p>
          <p>Drop-off Location: {document.dropoff}</p>
          <p>Time: {document.time}</p>
          <p>Price: {document.price}</p>
          <p>Car Type: {document.carType}</p>
          <button className='bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Accept</button>
          <button className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default RideList;