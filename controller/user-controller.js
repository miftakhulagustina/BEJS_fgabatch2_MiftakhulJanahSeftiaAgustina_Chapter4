const prisma = require('../db/prisma');
const USERS_MODELS = require('../model/user-model');

const USERS_CONTROLLER = {
    getAllUsers: async () => {
        const users = await USERS_MODELS.findUsers();
        return users;
    },

    getUserById: async (id) => {
        const user = await USERS_MODELS.findUserById(id);

        if (!user) {
            throw Error("User not found");
        }
        return user;
    },

    createUser: async (newUser) => {
        const user = await USERS_MODELS.insertUser(newUser);
        return user;
    },

    deleteUserById: async (id) => {
        await USERS_CONTROLLER.getUserById(id);
        await USERS_MODELS.deleteUser(id);
    },

    updateUserById: async (id, userData) => {
        await USERS_CONTROLLER.getUserById(id);
        const user = await USERS_MODELS.editUser(id, userData);
        return user;
    }

}

module.exports = USERS_CONTROLLER;