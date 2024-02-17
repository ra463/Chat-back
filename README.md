# Node.js and Express.js Application

This is a Node.js and Express.js application.

## Getting Started

To get started with this project, you'll need to follow these steps:

1. Clone this repository to your local machine.
2. Install the dependencies using `npm install`.
3. Create a `.env` file in the config folder of your project as "config.env".
4. Add the following environment variables to your `.env` file:

   ```plaintext
   MONGO_URI=<your MongoDB URI>
   PORT=4000
   JWT_SECRET=<some random string>
   JWT_EXPIRE=2D
   ```

## Start Project

In the project directory, you can run:

### npm start
Runs the app in the development mode.<br />
Open http://localhost:4000 to view it in your browser.

The server will reload if you make edits.<br />
You will also see any lint errors in the console.

### npm test
Launches the test runner in the interactive watch mode.<br />
See the section about running tests for more information.

### npm run build
Builds the app for production to the build folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
