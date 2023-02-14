import { getTripByIdApiCall } from '../../apiCalls/tripApiCalls'
import {Link, useParams} from 'react-router-dom'
import { useState, useEffect } from "react";
import TripDetailsData from './TripDetailsData'

function TripDetails() {

    let {idTrip} = useParams()
    idTrip = parseInt(idTrip)

    const [trip, setTrip] = useState(null)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    function fetchTripDetails() {
        getTripByIdApiCall(idTrip)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setTrip(null)
                        setMessage(data.message)
                    } else {
                        setTrip(data)
                        setMessage(null)
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchTripDetails()
    }, [])

    let content;

    if (error) {
        content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Loading client data...</p>
    } else if (message) {
        content = <p>{message}</p>
    } else {
        content = <TripDetailsData tripData={ trip } />
    }

    return (
        <main>
            {content}
            <div className="section-buttons">
                <Link to="/trips" className="form-button-cancel">Back</Link>
            </div>
        </main>
    )
}

export default TripDetails