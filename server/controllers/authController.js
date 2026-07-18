import db from '../config/laterboxDB.js';
import bcrypt from 'bcrypt';

const registerAccount = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            `INSERT INTO user (username, email, hashed_password) 
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
            `SELECT * FROM user
            WHERE email = ?`,
            [email]
        );

        const user = rows[0];

        if(!user) {
            return res.status(401).json({ message: "Incorrect Email or Password" });
        }

        const validPassword = await bcrypt.compare(password, user.hashed_password);

        if(!validPassword) {
            return res.status(401).json({ message: "Incorrect Email or Password" });
        }

        req.session.userId = user.user_id;
        res.status(200).json({ username: user.username, email: user.email, user_id: user.user_id })
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