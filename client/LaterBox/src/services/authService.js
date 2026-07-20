import base from "../utils/baseURL.js";

export const registerAccount = async (username, email, password) => {
    try {
        const res = await base.post('/auth/register', {
            username, email, password
        });

        return res.data;
    } catch(err) {
        throw new Error(
            err.response?.data?.message || 
            "Something went wrong.",
            { cause: err }
        );
    }
}

export const loginAccount = async (email, password) => {
    try{
        const res = await base.post('/auth/login', {
            email, password
        });
        
        return res.data;
    } catch(err) {
        throw new Error(
            err.response?.data?.message ||
            "Something went wrong.",
            { cause: err }
        );
    }
}

export const getUserData = async () => {
    try {
        const res = await base.get('/auth/me');
        return res.data;
    } catch(err) {
        throw new Error(
            err.response?.data?.message ||
            "Something went wrong",
            { cause: err }
        )
    }
}