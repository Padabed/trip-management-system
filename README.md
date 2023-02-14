# Trip-management-system

<p> This is a mini-project for a trip management system that enables users to manage trips and clients. 
The application is built using JavaScript on the backend and React on the frontend. 
The trip management system project utilizes node.js for the backend and is configured to run inside a Docker container. 
The system uses a MySQL database to store and manage data related to clients and their trips. 
The database is accessed through an Object Relational Mapping (ORM) tool such as Sequelize to provide a more user-friendly interface for interacting with the database. 
The system supports a range of functionalities, including creating and managing clients and trips, assigning trips to clients, generating reports and statistics, and managing user accounts and access levels. 
The system can also be extended to include additional features and integrations with other tools and systems, making it a flexible and scalable solution for managing trips and clients.</p>

### Project Definition

The project includes the following requirements:

#### Topic Definition
The mini-project aims to provide a trip management system that helps users manage trips and clients.

#### Data Model Definition
The project data model includes the following:

![Screenshot 2023-02-14 at 15 34 18](https://user-images.githubusercontent.com/77849594/218768689-86a28c29-dacb-4515-b168-ab332ffcf3f6.png)

## User Interface Design
### The mini-project aims to create a prototype application with the following user interface design:

- Adding a new record to the database
- Modification of a record in the database
- Deleting a record from the database
- Displaying a list of all available records (only the most important columns)
- View the details of a record from one-to-many table, including all columns of the table and records related by a many-to-many relationship.
- View the details of a record from many-to-many table, including all columns of the table except foreign keys, and for foreign keys, the most important business columns of related records.


### Notifications:
- after adding a new record
- after modifying the record
- before deleting a record with a request for confirmation
- after deletion of a record
- Form validation error messages
- highlighting an erroneous field
- message with error description
- summary of errors

### Functionality

#### The mini-project includes the following functionality:

- All data stored in the system must be persistent using a relational database.
- When creating and editing a record, the data should pass validation:
  - Client-side (JavaScript in the browser) 
  - Server-side
- The system should provide internationalization with at least two languages.
- The system should provide authentication and authorization with at least three user roles:
  - Not logged in
  - Registered user
  - Admin
- The system should have security mechanisms at the resource level. For example:
  - The customer can only view his/her own trips
  - The manager can only view employee data from his/her own department.
