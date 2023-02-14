export const clientList = [
    {
        "_id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@acme.com",
        "telephone": "11111111",
        "pesel": "12345678123"
    },
    {
        "_id": 2,
        "firstName": "Adam",
        "lastName": "Johnson",
        "email": "adam.johnson@acme.com",
        "telephone": "22222222",
        "pesel": "1234123412"
    },
    {
        "_id": 3,
        "firstName": "Steve",
        "lastName": "Jones",
        "email": "steve.jones@acme.com",
        "telephone": "33333333",
        "pesel": "22222333127"
    }
]

export const clientDetailsList = [
    {
        "_id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@acme.com",
        "telephone": "11111111",
        "password": "11111111",
        "pesel": "12345678123",
        "client_trip": [
            {
                "_id": 1,
                "registeredAt": "2022-01-01",
                "paymentDate": "2022-01-01",
                "idClient": 1,
                "idTrip": 1,
                "trip": {
                    "_id": 1,
                    "name": "Russia-Dubai",
                    "dateFrom": "2022-01-05",
                    "dateTo": "2023-01-05",
                    "maxPeople": "100"
                }
            },
            {
                "_id": 2,
                "registeredAt": "2022-01-01",
                "paymentDate": "2022-01-01",
                "idClient": 2,
                "idTrip": 1,
                "trip": {
                    "_id": 1,
                    "name": "Russia-Cyprus",
                    "dateFrom": "2022-01-05",
                    "dateTo": "2023-01-05",
                    "maxPeople": "100"
                }
            }
        ]
    },
    {
        "_id": 2,
        "firstName": "Adam",
        "lastName": "Johnson",
        "email": "adam.johnson@acme.com",
        "telephone": "22222222",
        "pesel": "1234123412",
        "client_trip": [
            {
                "_id": 1,
                "registeredAt": "2022-01-01",
                "paymentDate": "2022-01-01",
                "idClient": 3,
                "idTrip": 2,
                "trip": {
                    "_id": 2,
                    "name": "Russia-Dubai",
                    "dateFrom": "2022-01-05",
                    "dateTo": "2023-01-05",
                    "maxPeople": "100"
                }
            },
            {
                "_id": 3,
                "registeredAt": "2022-01-01",
                "paymentDate": "2022-01-01",
                "idClient": 2,
                "idTrip": 2,
                "trip": {
                    "_id": 2,
                    "name": "Russia-Cyprus",
                    "dateFrom": "2022-01-05",
                    "dateTo": "2023-01-05",
                    "maxPeople": "100"
                }
            }
        ]
    },
    {
        "_id": 3,
        "firstName": "Steve",
        "lastName": "Jones",
        "email": "steve.jones@acme.com",
        "telephone": "11111111",
        "pesel": "12345678123",
        "client_trip": []
    }
]