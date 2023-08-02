# Alohomora Library Management System

This repository contains a Library Management System built using the MERN (MongoDB, Express, React, Node.js) stack. The system allows librarians to manage books, patrons, and borrowing records efficiently.

## Features

- Book Management: Add, update, and delete books with details like title, author, ISBN, and genre.
- Student Management: Add, update, and delete student records with name, contact info, and Student ID.
- User Authentication: Only authorized librarians can access management features through login.
- Books Page: View, add, and manage books in the library's collection.
- Students Page: View, add, and manage student records in the system.
- Login and Register Pages: Librarians can log in and register to access the system.
- Frontend Data Management: Easily edit book and student records from the user interface.

## Installation

Follow these steps to set up the Library Management System on your local machine:

1. Clone the repository: `https://github.com/aditi578/Alohomora.git`
2. Navigate to the project directory: `cd library-management-system`
3. Install server dependencies: `npm install`
4. Install client dependencies: `cd userinterface && npm install`
5. Set up the database: Ensure you have MongoDB installed and running on your machine. Create a new database and configure the connection URL in `server.js` and `client/src/utils/api.js`.
6. Start the development server: `nodemon server.js`

The server will run on `http://localhost:5000`, and the client will run on `http://localhost:3000`.

## Project Structure

The project is organized as follows:

- `backend`: Contains the backend server code, including routes and database models for books, patrons, and borrowing records.
- `userinterface`: Contains the frontend React application code.
- `server.js`: The entry point for the backend server.
- `package.json`: Contains the project dependencies and scripts.

## Technologies Used

- MongoDB: Database to store book, patron, and borrowing record data.
- Express: Backend web application framework for handling routes and requests.
- React: Frontend JavaScript library for building user interfaces.
- Node.js: Server-side JavaScript runtime environment.
- JWT: JSON Web Tokens for user authentication.
- Axios: Promise-based HTTP client for making API requests.
- Material-UI: UI library for styling and components.


Thank you for using the MERN Stack Alohomora Library Management System. We hope you find it helpful in efficiently managing your library's books and patrons. If you have any questions or need assistance, feel free to reach out to us. Happy reading and managing!
