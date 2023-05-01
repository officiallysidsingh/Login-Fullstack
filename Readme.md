# TODO

1. Make Control Flow Diagram.
2. Make verifyUser Middleware and Refactor Code. [x]
3. Write all new error codes in constants.
4. Write switch cases for those error codes in Error Handler.
5. Make env.example folder and write all documentation to setup and run locally.

# Login Fullstack App

This is a full stack app made using MERN Stack. It implements the JWT token Authentication Pattern

## NPM Libraries Used On Client Side App

- Used Formik for Form Validation.
- Used Hot Toast to show success, failure and loading toasts.
- Used React Router DOM for Routing in React App.
- Used JWT Decode to decode the username from JWT Token.
- Used Axios to Fetch and Post Data to Backend Server using API.
- Used TailwindCSS for styling of the React App.
- Used Zustand for State Management in React App.

## NPM Libraries Used On Server Side App

- BCrypt for Hashing Password Before Storing In DB.
- CORS for allowing CROSS-ORIGIN Resource Sharing.
- Dotenv for using .env files inside the server files.
- Express Async Handler to throw errors to error handler middleware directly.
- JWT for Authentication And Authorization
- Mongoose as ODM for MongoDB database connection, storage and retrieval of data.
- Morgan for logging the requests
- Multer for storing images on the Database.
- OTP Generator to generate OTP for Password Reset.

## Steps To Setup On Local Machine

1. Go to the server directory from terminal using the command `cd server`.
2. Install all the dependencies using the `npm install` command.
3. Make a .env file and configure all the Environment Variables as given in the .env.example file inside server directory.
4. Now run the server using the command `npm run dev`.
5. While keeping the server running open another terminal and go to the client directory using the command `cd client`.
6. Install all the dependencies using the `npm install` command.
7. Make a .env file and configure all the Environment Variables as given in the .env.example file inside client directory.
8. Now run the client app using the command `npm run dev` and go to the url given in terminal to see the application.
