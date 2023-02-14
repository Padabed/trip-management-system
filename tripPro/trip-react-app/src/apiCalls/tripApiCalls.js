import {useEffect} from "react";
import {redirect} from "react-router-dom";
import React from "react";

const tripsBaseUrl = 'http://localhost:3000/api/trips/'

export function getTripsApiCall() {
    const promise = fetch(tripsBaseUrl)
    return promise;
}

export function getTripByIdApiCall(idTrip) {
    const url = `${tripsBaseUrl}/${idTrip}`;
    const promise = fetch(url);
    return promise;
}

export function addTripApiCall(trip) {
    const tripString = JSON.stringify(trip)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: tripString
    }
    const promise = fetch(tripsBaseUrl, options);
    return promise;
}

export function updateTripApiCall(idTrip, trip) {
    const url = `${tripsBaseUrl}${idTrip}`
    const tripString = JSON.stringify(trip)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: tripString
    }
    console.log(trip)
    const promise = fetch(url, options);
    return promise;
}

export function deleteTripApiCall(idTrip){
    const url = `${tripsBaseUrl}${idTrip}`
    console.log("empID--------------------------" + idTrip)
    const options = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const promise = fetch(url, options);
    return promise;
}