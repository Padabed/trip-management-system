import {Link} from "react-router-dom";
import {getTripsApiCall} from '../../apiCalls/tripApiCalls'
import {useState, useEffect} from "react";
import TripListTable from './TripListTable'

function TripList() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [trips, setTrips] = useState([])

    function fetchTripList() {
        getTripsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setTrips(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchTripList()
    }, [])

    let content;

    if (error) {
        content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Loading trips data...</p>
    } else {
        content = <TripListTable tripList={trips}/>
    }

    return (
        <main>
            <h2>Trip list</h2>
            {content}
            <p className="section-buttons">
                <Link to="/trips/add" className="button-add">Add new trips</Link>
            </p>
        </main>
    )
}


export default TripList