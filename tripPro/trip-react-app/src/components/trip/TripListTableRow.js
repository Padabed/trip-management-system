import { Link } from 'react-router-dom';
import {deleteTripApiCall} from "../../apiCalls/tripApiCalls";
import {getFormattedDate} from "../../helpers/dateHelper";

function TripListTableRow(props) {
    const trip = props.tripData
    return (
        <tr>
            <td>{trip.name}</td>
            <td>{trip.dateFrom ? getFormattedDate(trip.dateFrom) : ""}</td>
            <td>{trip.dateTo ? getFormattedDate(trip.dateTo) : ""}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/trips/details/${trip.idTrip}`} className="list-actions-button-details">Details</Link></li>
                    <li><Link to={`/trips/edit/${trip.idTrip}`} className="list-actions-button-edit">Edit</Link></li>
                    <li><Link to={`/trips`}  onClick={() => deleteTripApiCall(trip.idTrip)} className="list-actions-button-delete">Delete</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default TripListTableRow