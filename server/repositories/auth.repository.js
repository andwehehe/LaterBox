import { randomInt } from 'node:crypto';
import prisma from '../config/prisma.js';

export const createUser = async ({ username, email, hashedPassword }) => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
        const display_id = String(randomInt(10_000_000, 100_000_000));

        try {
            await prisma.users.create({
                data: {
                    username,
                    email,
                    hashed_password: hashedPassword,
                    display_id
                }
            });

            return;
        } catch (error) {
            const isDisplayIdConflict = error.code === 'P2002'
                && String(error.meta?.target ?? '').includes('display_id');

            if (!isDisplayIdConflict || attempt === 4) throw error;
        }
    }
}

export const findUserByEmail = async (email) => {   
    const user = await prisma.users.findUnique({
        where: {
            email
        }
    })

    return user;
};

export const getUserDataById = async (userId) => {
    const userData = await prisma.users.findUnique({
        where: {
            user_id: userId
        },
        select: {
            user_id: true,
            username: true,
            email: true
        }
    })

    return userData;
}

export const updateUsernameById = async (userId, username) => {
    return prisma.users.update({
        where: { user_id: userId },
        data: { username },
        select: {
            user_id: true,
            username: true,
            email: true
        }
    });
};