import db from '../config/laterboxDB.js';
import bcrypt from 'bcrypt';
import { authQueries } from '../queries/authQueries.js';

const { registerAccount_query, loginAccount_query, getUserData_query } = authQueries;

const registerAccount = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.promise().query(
            registerAccount_query,
            [username, email, hashedPassword]
        );

        req.session.userId = result.insertId;
        res.status(201).json({ message: "Account Created Successfully. Proceed to Login Page" });
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

        const [rows] = await db.promise().query(
            loginAccount_query,
            [email]
        );

        const user = rows[0];

        if(!user) {
            return res.status(401).json({ message: "Incorrect Email or Password" });
        }

        bcrypt.compare(password, user.hashed_password, (err, result) => {
            if(!result) {
                return res.status(401).json({ message: "Incorrect Email or Password" });
            }

            req.session.regenerate((err) => {
                if(err) {
                    return res.sendStatus(500);
                }

                req.session.userId = user.user_id;
                res.status(200).json({ username: user.username, email: user.email, user_id: user.user_id })
            })
        });
        
    } catch(err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const getUserData = async (req, res) => {
    try {
        const [rows] = await db.promise().query(
            getUserData_query,
            [req.session.userId]
        )

        if(rows.length === 0) {
            console.log("user not found")
            return res.status(404).json({ message: "User not found" });
        }

        const { user_id, username, email } = rows[0];

        res.status(200).json({ 
            user_id,
            username,
            email
         });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const authControllers = {
    registerAccount,
    loginAccount,
    getUserData
};