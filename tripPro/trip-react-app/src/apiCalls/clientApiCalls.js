const clientsBaseUrl = 'http://localhost:3000/api/clients/'

export function getClientsApiCall() {
    const promise = fetch(clientsBaseUrl)
    return promise;
}

export function getClientByIdApiCall(idClient) {
    const url = `${clientsBaseUrl}/${idClient}`;
    const promise = fetch(url);
    return promise;
}

export function addClientApiCall(client) {
    const clientString = JSON.stringify(client)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: clientString
    }
    const promise = fetch(clientsBaseUrl, options);
    return promise;
}

export function updateClientApiCall(idClient, client) {
    const url = `${clientsBaseUrl}${idClient}`
    const clientString = JSON.stringify(client)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: clientString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteClientApiCall(idClient){
    const url = `${clientsBaseUrl}${idClient}`
    console.log("clientID--------------------------" + idClient)
    const options = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const promise = fetch(url, options);
    return promise;
}