import { getFormattedDate } from "../../helpers/dateHelper";
import React from "react";

function CTDetailsData(props) {
    const ct = props.ctData
    const registeredAt = ct.registeredAt ? getFormattedDate(ct.registeredAt) : ""
    const paymentDate = ct.paymentDate ? getFormattedDate(ct.paymentDate) : ""
    return (
        <>
            <tr key={ct.idCT} >
            <p>Client: {ct.client.firstName + " " + ct.client.lastName} </p>
            <p>Trip: {ct.trip.name} </p>
            <p>Registration Date: {registeredAt} </p>
            <p>Payment Date: {paymentDate} </p>
            <p>Date From: {ct.trip.dateFrom} </p>
            <p>Date To: {ct.trip.dateTo} </p>
            </tr>
        </>
    )
}

export default CTDetailsData