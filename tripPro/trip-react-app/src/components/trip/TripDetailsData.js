function TripDetailsData(props) {
    const trip = props.tripData
    return (
        <>
            <h2>
                Trip Details
            </h2>
            <p>Name: {trip.name}</p>
            <p>DateFrom: {trip.dateFrom} </p>
            <p>DateTo: {trip.dateTo} </p>
            <p>MaxPeople: {trip.maxPeople} </p>
            <h2>Client_Trip Details</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Registration Date</th>
                </tr>
                </thead>
                <tbody>
                {trip.ct.map(
                    client_trip =>
                        <tr key={client_trip.idCT}>
                            <td>{client_trip.client.firstName + " " + client_trip.client.lastName}</td>
                            <td>{client_trip.client.email}</td>
                            <td>{client_trip.registeredAt}</td>
                        </tr>
                )}
                </tbody>
            </table>
        </>
    )
}

export default TripDetailsData