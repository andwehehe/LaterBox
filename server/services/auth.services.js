import bcrypt from 'bcrypt';
import * as authRepository from '../repositories/auth.repository.js';

export const registerAccount = async ({ username, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = authRepository.createUser({ username, email, hashedPassword });
    return createdUser;
}

export const loginAccount = async ({ email, password }) => {

    const user = await authRepository.findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(
        password,
        user.hashed_password
    );

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    return user;
};

export const getUserData = async (userId) => {
    
    const userData = await authRepository.getUserDataById(userId);
    
    if(!userData) {
        throw new Error("User not found");
    }

    return userData;
}