const getLocationCoordinates = async (req,res) => {
    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${req.body.location}.json?country=in&access_token=pk.eyJ1Ijoia2lyaXRvYWZ0YWIiLCJhIjoiY2xmOXJtZ3VrMWR1NDN5cGNiNzN6eG5nNSJ9.dzEGKIGdXuimtnos0Y6MIg`

    try {
        const response = await fetch(mapBoxUrl)
        const data = await response.json()
        console.log(data)
        res.status(200).send({message: 'success', data: data.features[0].center })
        } catch (error) {
        res.status (500).send({ message: 'error', data: error.message })
        }
}
export default getLocationCoordinates