const registerAccount_query = `
    INSERT INTO users (username, email, hashed_password) 
    VALUES (?, ?, ?);
`;

const loginAccount_query = `
    SELECT * FROM users
    WHERE email = ?;
`;

const getUserData_query = `
    SELECT user_id, username, email 
    FROM users WHERE user_id = ?;
`;

export const authQueries = {
    registerAccount_query,
    loginAccount_query,
    getUserData_query
}