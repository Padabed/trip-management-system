const ctBaseUrl = 'http://localhost:3000/api/cts/'

export function getCTApiCall() {
    const promise = fetch(ctBaseUrl)
    return promise;
}

export function getCTByIdApiCall(idCT) {
    const url = `${ctBaseUrl}${idCT}`;
    const promise = fetch(url);
    return promise;
}

export function addCTApiCall(ct) {
    const ctString = JSON.stringify(ct)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ctString
    }
    const promise = fetch(ctBaseUrl, options);
    return promise;
}

export function updateCTApiCall(idCT, ct) {
    const url = `${ctBaseUrl}${idCT}`
    const clientString = JSON.stringify(ct)
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

export function deleteCTApiCall(idCT){
    const url = `${ctBaseUrl}${idCT}`
    console.log("ctID--------------------------" + idCT)
    const options = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const promise = fetch(url, options);
    return promise;
}