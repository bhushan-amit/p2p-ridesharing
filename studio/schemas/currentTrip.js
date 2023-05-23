export default {
    name: 'ride',
    title: 'Ride',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
       
      },
      {
        name: 'pickupCoordinate',
        title: 'Pickup Coordinate',
        type: 'geopoint',
        
      },
      {
        name: 'dropoffCoordinate',
        title: 'Drop-off Coordinate',
        type: 'geopoint',
        
       
      },
      {
        name: 'time',
        title: 'Time',
        type: 'string',
        
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
      
      },
      {
        name: 'carType',
        title: 'Car Type',
        type: 'string',
        
      },
      {
        name:'pickup',
        title:'Pickup Location',
        type:'string'
      },
      {
        name:'dropoff',
        title:'Dropoff Location',
        type:'string'
      },
      {
        name: 'rideStatus',
        title: 'Ride Status',
        type: 'string',
       
      },
    ],
  };