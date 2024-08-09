const prisma = require('../db/prisma');

const USERS_MODELS = {
    findUsers: async () => {
        const users = await prisma.user.findMany();
        return users;
    },

    findUserById: async (id) => {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
        return user;
    },

    insertUser: async (newUser) => {
        const user = await prisma.user.create({
            data: {
                username: newUser.username,
                password: newUser.password,
                email: newUser.email,
                name: newUser.name,
                phone: newUser.phone
            }
        });
        return user;
    },

    deleteUser: async (id) => {
        await prisma.user.delete({
            where: {
                id
            }
        });
    },

    editUser: async (id, userData) => {
        const user = await prisma.user.update({
            where: {
                id
            },
            data: {
                username: userData.username,
                password: userData.password,
                email: userData.email,
                name: userData.name,
                phone: userData.phone
            },
        });
        return user;
    }
}
module.exports = USERS_MODELS;