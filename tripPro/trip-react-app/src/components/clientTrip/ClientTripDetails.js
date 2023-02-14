import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCTByIdApiCall } from '../../apiCalls/clientTripApiCalls'
import CTDetailsData from './ClientTripDetailsData'

function CTDetails() {
    const [ct, setCT] = useState({})
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    let { ctId } = useParams()
    ctId = parseInt(ctId)

    function fetchCTDetails() {
        getCTByIdApiCall(ctId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setCT(null)
                        setMessage(data.message)
                    } else {
                        setCT(data)
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
        fetchCTDetails()
    }, [])

    let content
    if (error) {
        content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Loading client_trip data...</p>
    } else if (message) {
        content = <p>{message}</p>
    } else {
        content = <CTDetailsData ctData={ct} />
    }

    return (
        <main>
            { content }
            <div className="section-buttons">
                <Link to="/cts" className="form-button-cancel">Back</Link>
            </div>
        </main>
    )
}

export default CTDetails