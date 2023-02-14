import React from "react";
import { getFormattedDate } from "../../helpers/dateHelper";

function ClientDetailsData(props) {
    const clt = props.clientData
    return (
        <>
            <h2>
                Client Details
            </h2>
            <p>Name: {clt.firstName}</p>
            <p>Surname: {clt.lastName} </p>
            <p>E-mail: {clt.email} </p>
            <p>Telephone: {clt.telephone} </p>
            <p>Pesel: {clt.pesel} </p>
            <h2>Client_Trip Details</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Trip Name</th>
                    <th>Date From</th>
                    <th>Date To</th>
                    <th>Payment Date</th>
                </tr>
                </thead>
                <tbody>
                {clt.ct.map(
                    client_trip =>
                        <tr key={client_trip.idCT}>
                            <td>{client_trip.trip.name}</td>
                            <td>{client_trip.trip.dateFrom ? getFormattedDate(client_trip.trip.dateFrom) : ""}</td>
                            <td>{client_trip.trip.dateTo ? getFormattedDate(client_trip.trip.dateTo) : ""}</td>
                            <td>{client_trip.paymentDate ? getFormattedDate(client_trip.paymentDate) : ""}</td>
                        </tr>
                )}
                </tbody>
            </table>
        </>
    )
}

export default ClientDetailsData