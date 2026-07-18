>> Install these dependencies using npm install <<
1. express 
2. express-session 
3. cors 
4. dotenv 
5. mysql2 
6. bcryptjs
7. nodemod

>> nodemon setup <<
installation: npm install --save-dev nodemon
package.json: add this in the script "dev": "nodemon server.js"

>> other package.json setup <<
change the type property from CommonJS to module

>> Generate a SESSION_SECRET <<
run this command in the terminal: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

>> How to use dotenv <<
import dotenv
run dotenv.config(); before everything
then process.env.ENV_VARIABLE (ENV_VARIABLE is a variable you want to access in the .env file)

>> app.js <<
- all important middlewares goes here like express, cors, session, dotenv, etc.
- mostly app.use() functions

- session setup
session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // true when using HTTPS in production
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
})

- cors setup
{
    origin: >> frontend url <<,
    credentials: true
}

- routes are also imported here to set a base url and use the router as their route
- ex. app.use('/auth', authRoute);

>> server.js <<
- entry point (app.listen())

>> config/ <<
- create the database connection here
- import mysql2 then use it to .createConnection() and fill out these properties
    - host
    - user
    - password
    - database
- then .connect() then return if there is an error (err)
- export the db then use it to do queries in controller/

>> controllers/ <<
- create async functions that handles http endpoints
- import the db for queries and bcrypt for password hashing
- export the functions and use them in route

>> routes/ <<
- create http endpoints here
- create a router object using expres.Router() then use it to http methods
- import the function from the controllers then use them as callback to the http method
- export the router object then use it in app.js