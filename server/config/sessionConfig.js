import session from 'express-session';

session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // true when using HTTPS in production
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
});

export default sessionConfig;