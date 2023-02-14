export const tripList = [
    {
        "_id": 1,
        "name": "Russia-Dubai",
        "dateFrom": "2022-01-05",
        "dateTo": "2023-01-05",
        "maxPeople": "100"
    }
]

export const tripDetailsList = [
    {
        "_id": 1,
        "name": "Russia-Dubai",
        "dateFrom": "2022-01-05",
        "dateTo": "2023-01-05",
        "maxPeople": "100",
        "client_trip": [
            {
                "_id": 1,
                "name": "John",
                "dateFrom": "Smith",
                "dateTo": "john.smith@acme.com",
                "maxPeople": "11111111",
                "client": {
                    "_id": 1,
                    "firstName": "John",
                    "lastName": "Smith",
                    "email": "john.smith@acme.com",
                    "telephone": "11111111",
                    "pesel": "12345678123"
                }
            }
        ]
    }
]