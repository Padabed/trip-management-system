CREATE SCHEMA IF NOT EXISTS trip_pro;

/*
CREATE TABLE trip_pro.Client (
                                 IdClient int NOT NULL,
                                 FirstName varchar(120) NOT NULL,
                                 LastName varchar(120) NOT NULL,
                                 Email varchar(120) NOT NULL,
                                 Telephone varchar(120) NOT NULL,
                                 Pesel varchar(120) NOT NULL,
                                 CONSTRAINT Client_pk PRIMARY KEY (IdClient)
);

-- Table: Client_Trip
CREATE TABLE trip_pro.Client_Trip (
                                      RegisteredAt date NOT NULL,
                                      PaymentDate date NULL,
                                      IdClient int NOT NULL,
                                      IdTrip int NOT NULL,
                                      CONSTRAINT Client_Trip_pk PRIMARY KEY (IdClient,IdTrip)
);

-- Table: Trip
CREATE TABLE trip_pro.Trip (
                               IdTrip int NOT NULL,
                               Name varchar(120) NOT NULL,
                               DateFrom date NOT NULL,
                               DateTo date NOT NULL,
                               MaxPeople int NOT NULL,
                               CONSTRAINT Trip_pk PRIMARY KEY (IdTrip)
);

-- foreign keys
-- Reference: Client_Trip_Client (table: Client_Trip)
ALTER TABLE trip_pro.Client_Trip ADD CONSTRAINT Client_Trip_Client FOREIGN KEY Client_Trip_Client (IdClient)
    REFERENCES trip_pro.Client (IdClient);

-- Reference: Client_Trip_Trip (table: Client_Trip)
ALTER TABLE trip_pro.Client_Trip ADD CONSTRAINT Client_Trip_Trip FOREIGN KEY Client_Trip_Trip (IdTrip)
    REFERENCES trip_pro.Trip (IdTrip);

 */