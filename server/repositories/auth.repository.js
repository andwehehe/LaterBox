import db from '../config/laterbox.db.js';

export const createUser = async ({ username, email, hashedPassword }) => {

    const [newUser] = await db.query(
        `INSERT INTO users (username, email, hashed_password) 
        VALUES (?, ?, ?)`,
        [username, email, hashedPassword]
    );

    return newUser.insertId;
}

export const findUserByEmail = async (email) => {

    const [users] = await db.query(
        `SELECT *
         FROM users
         WHERE email = ?`,
        [email]
    );

    return users[0] ?? null;
};

export const getUserDataById = async (userId) => {
    const [userData] = await db.query(
        `SELECT user_id, username, email 
         FROM users WHERE user_id = ?`,
        [userId]
    );

    return userData[0] ?? null;
}