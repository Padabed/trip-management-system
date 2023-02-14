import {Link} from "react-router-dom";
import {getClientsApiCall} from '../../apiCalls/clientApiCalls'
import {useState, useEffect} from "react";
import ClientListTable from './ClientListTable'

function ClientList() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [clients, setClients] = useState([])

    function fetchClientList() {
        getClientsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setClients(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchClientList()
    }, [])

    let content;

    if (error) {
        content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Loading clients data...</p>
    } else {
        content = <ClientListTable clientList={clients}/>
    }

    return (
        <main>
            <h2>Clients list</h2>
            {content}
            <p className="section-buttons">
                <Link to="/clients/add" className="button-add">Add new client</Link>
            </p>
        </main>
    )
}


export default ClientList