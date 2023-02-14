import React from "react";
import ClientTripListTableRow from "./ClientTripListTableRow";

function ClientTripListTable(props) {
    const cts = props.ctList
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>Client</th>
                <th>Trip</th>
                <th>Registration Date</th>
                <th>Payment Date</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {cts.map(ct =>
                <ClientTripListTableRow ctData={ct} key={ct.idCT} />
            )}
            </tbody>
        </table>
    )
}

export default ClientTripListTable