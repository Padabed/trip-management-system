import { Link } from "react-router-dom"
import { getFormattedDate } from "../../helpers/dateHelper";
import React from "react";
import {deleteCTApiCall} from "../../apiCalls/clientTripApiCalls";

function ClientTripListTableRow(props) {
    const ct = props.ctData
    return (
        <tr>
            <td><Link to={`/clients/details/${ct.idClient}`}>{ct.client.firstName + ' ' + ct.client.lastName}</Link></td>
            <td><Link to={`/trips/details/${ct.idTrip}`}>{ct.trip.name}</Link></td>
            <td>{ct.registeredAt ? getFormattedDate(ct.registeredAt) : ""}</td>
            <td>{ct.paymentDate ? getFormattedDate(ct.paymentDate) : ""}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/cts/details/${ct.idCT}`} className="list-actions-button-details">Details</Link></li>
                    <li><Link to={`/cts/edit/${ct.idCT}`} className="list-actions-button-edit">Edit</Link></li>
                    <li><Link to={`/cts`} onClick={() => deleteCTApiCall(ct.idCT)} className="list-actions-button-delete">Delete</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default ClientTripListTableRow