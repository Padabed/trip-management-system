import { Link } from 'react-router-dom';
import {deleteClientApiCall} from "../../apiCalls/clientApiCalls";

function ClientListTableRow(props) {
    const cl = props.clientData
    return (
        <tr>
            <td>{cl.firstName}</td>
            <td>{cl.lastName}</td>
            <td>{cl.email}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/clients/details/${cl.idClient}`} className="list-actions-button-details">Details</Link></li>
                    <li><Link to={`/clients/edit/${cl.idClient}`} className="list-actions-button-edit">Edit</Link></li>
                    <li><Link to={`/clients`} onClick={() => deleteClientApiCall(cl.idClient)} className="list-actions-button-delete">Delete</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default ClientListTableRow