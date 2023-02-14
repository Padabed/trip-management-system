import {Link} from "react-router-dom";
import {getCTApiCall} from '../../apiCalls/clientTripApiCalls'
import {useState, useEffect} from "react";
import CTListTable from './ClientTripListTable'

function CTList() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [cts, setCT] = useState([])

    function fetchCTList() {
        getCTApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setCT(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchCTList()
    }, [])

    let content;

    if (error) {
        content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Loading client_trip data...</p>
    } else {
        content = <CTListTable ctList={cts}/>
    }

    return (
        <main>
            <h2>Client Trip list</h2>
            {content}
            <p className="section-buttons">
                <Link to="/cts/add" className="button-add">Add new client_trip</Link>
            </p>
        </main>
    )
}


export default CTList