import ClientListTableRow from './ClientListTableRow'

function ClientListTable(props) {
    const clients = props.clientList
    return (
        <table className="table-list" >
            <thead>
            <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {clients.map(cl =>
                <ClientListTableRow clientData={cl} key={cl.idClient} />
            )}
            </tbody>
        </table >
    )
}

export default ClientListTable