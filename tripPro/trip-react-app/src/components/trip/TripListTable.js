import TripListTableRow from './TripListTableRow'

function TripListTable(props) {
    const trips = props.tripList
    return (
        <table className="table-list" >
            <thead>
            <tr>
                <th>Name</th>
                <th>DateFrom</th>
                <th>DateTo</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {trips.map(trip =>
                <TripListTableRow tripData={trip} key={trip.idTrip} />
            )}
            </tbody>
        </table >
    )
}

export default TripListTable