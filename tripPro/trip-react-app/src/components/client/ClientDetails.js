import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {getClientByIdApiCall} from '../../apiCalls/clientApiCalls'
import {useState, useEffect} from "react";
import ClientDetailsData from './ClientDetailsData'

function ClientDetails() {

    let {idClient} = useParams()
    idClient = parseInt(idClient)

    const [cl, setCl] = useState(null)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    function fetchClientDetails() {
        getClientByIdApiCall(idClient)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setCl(null)
                        setMessage(data.message)
                    } else {
                        setCl(data)
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
        fetchClientDetails()
    }, [])

    let content;

    if (error) {
        content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Loading client data...</p>
    } else if (message) {
        content = <p>{message}</p>
    } else {
        content = <ClientDetailsData clientData={cl} />
    }

    return (
        <main>
            {content}
            <div className="section-buttons">
                <Link to="/clients" className="form-button-cancel">Back</Link>
            </div>
        </main>
    )
}

export default ClientDetails