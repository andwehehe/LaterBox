import db from '../config/laterboxDB.js';
import bcrypt from 'bcrypt';

const registerAccount = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            `INSERT INTO User (Username, Email, HashedPassword) 
            VALUES (?, ?, ?)`,
            [username, email, hashedPassword]
        );

        req.session.userId = result.insertId;
        res.status(201).json({ message: "Account Created Successfully" });
    } catch(err) {
        console.error(err);
        
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const loginAccount = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [rows] = await db.query(
            `SELECT * FROM User
            WHERE Email = ?`,
            [email]
        );

        const user = rows[0];

        if(!user) {
            return res.status(401).json({ message: "Incorrect Email or Password" });
        }

        const validPassword = await bcrypt.compare(password, user.HashedPassword);

        if(!validPassword) {
            return res.status(401).json({ message: "Incorrect Email or Password" });
        }

        req.session.userId = user.UserID;
        res.status(200).json({ Username: user.Username, Email: user.Email, UserID: user.UserID })
    } catch(err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const authControllers = {
    registerAccount,
    loginAccount
};