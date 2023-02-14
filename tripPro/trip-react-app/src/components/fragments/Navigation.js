import { Link } from 'react-router-dom'

function Navigation() {
    return (
        <nav>
            <a><Link to="/">Main page</Link></a>
            <a><Link to="/clients">Client</Link></a>
            <a><Link to="/trips">Trip</Link></a>
            <a><Link to="/cts">Client_Trip</Link></a>
            <div className="animation
                <%= navLocation == 'main' ? 'start-mainPage' :
                    navLocation == 'clt' ? 'start-client' :
                            navLocation == 'trip' ? 'start-trip' :
                                    navLocation == 'ct' ? 'start-clientTrip' : '' %>">
            </div>
        </nav>
    )
}

export default Navigation