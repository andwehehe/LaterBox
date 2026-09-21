import prisma from '../config/prisma.js';

export const createUser = async ({ username, email, hashedPassword }) => {
    const newUser = await prisma.users.create({
        data: {
            username,
            email,
            hashed_password: hashedPassword
        }
    });

    return newUser.user_id;
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