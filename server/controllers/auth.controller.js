import * as authServices from '../services/auth.services.js';

const registerAccount = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUserId = await authServices.registerAccount({ 
            username, 
            email, 
            password 
        });

        req.session.userId = newUserId;

        res.status(201).json({ 
            message: "Account Created Successfully. Proceed to Login Page" 
        });
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

        const user = await authService.loginAccount({ 
            email, 
            password 
        });

        req.session.regenerate((err) => {
            if(err) return res.sendStatus(500);

            req.session.userId = user.user_id;

            res.status(200).json({ 
                username: user.username, 
                email: user.email, 
                user_id: user.user_id 
            });
        })
        
    } catch(err) {
        console.error(err);

        if (err.message === "Invalid credentials") {
            return res.status(404).json({
                message: err.message
            });
        }

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const getUserData = async (req, res) => {
    try {
        const { user_id, username, email } = await authServices.getUserData(req.session.userId)

        res.status(200).json({ 
            user_id,
            username,
            email
         });
    } catch(err) {
        console.error(err);

        if (err.message === "User not found") {
            return res.status(404).json({
                message: err.message
            });
        }

        return res.status(500).json({ 
            message: "Internal Server Error" 
        });
    }
}

export const authControllers = {
    registerAccount,
    loginAccount,
    getUserData
};