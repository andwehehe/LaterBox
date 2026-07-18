import app from './app.js';

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})






// accountRouter.post('/register', async (req,res) => {
//     const { username, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const [result] = await db.query(
//         'INSERT INTO users (username, email, hashed_password) VALUES (?, ?, ?)', 
//         [username, email, hashedPassword]
//     );
    
//     req.session.userId = result.insertId;
//     res.status(201).json({ message: 'User registered successfully' });
// })

// accountRouter.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     const [rows] = await db.query(
//         'SELECT * FROM Users WHERE email = ?',
//         [email]
//     );

//     const user = rows[0];

//     if(!user) {
//         return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.hashed_password);

//     if(!isPasswordValid) {
//         return res.status(401).json({ message: "Invalid email or password" });
//     }

//     req.session.userId = user.id;
//     res.status(200).json({ email, username:user.username, id: user.id });
// })

// const requireAuth = (req, res, next) => {
//     if(!req.session.userId) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
//     next();
// }

// bookmarkRouter.get('/bookmarks', requireAuth, async (req, res) => {
//     const [bookmarks] = await db.query(
//         'SELECT * FROM bookmarks WHERE user_id = ?',
//         [req.session.userId]
//     )

//     res.status(200).json({ bookmarks });
// })

// register => you get the values from req.body then hash the password using bcrypt.hash() 
//             and store the data (username, email, hashedPassword) in the database. 
//             After successful registration, set the userId in the session (req.session.userId = result.insertId) 
//             and return a success message.

// login => you get the email and password from req.body, then query the database for a user with the provided email.
//          If the user is found, compare the provided password with the hashed password stored in the database using bcrypt.compare(typed_password, hashed_password).
//          If the password is valid, set the userId in the session (req.session.userId = user.id) and return a success message along with user details.
//          If the email or password is invalid, return an error message.

// requireAuth => this is a middleware function that checks if the user is authenticated by 
//                verifying if req.session.userId exists.

// getBookmarks => this route handler retrieves all bookmarks by getting the userId from the session 
//                 and use that id to query and retrieve the bookmarks.