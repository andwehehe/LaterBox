import mysql from 'mysql2';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "wlwglazer",
    database: "LaterBox"
});

db.connect(err => {
    if(err) {
        console.error(`DB connection failed ${err}`);
        return;
    }

    console.log('Connected to MySQL');
})

export default db;