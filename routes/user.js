const express = require('express');
const router = express.Router();
//const prisma = require('../db/prisma');

const USERS_CONTROLLER = require('../controller/user-controller');



//createUser
router.post('/create', async (req, res) => {
    try {
        const newUser = req.body;
        const user = await USERS_CONTROLLER.createUser(newUser);

        res.status(201).send({
            data: {
                username: newUser.username,
                email: newUser.email,
                name: newUser.name,
                phone: newUser.phone
            },
            message: 'user created'
        })
    } catch (err) {
        if (err.code === 'P2002' && err.meta.target.includes('email')) {
            res.status(400).json({
                message: 'Email is already in use. Please use another email.',
            });
        } else {
            res.status(500).json({
                message: 'Server error',
            });
        }
    }

});

//getUser
router.get('/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await USERS_CONTROLLER.getUserById(userId);

        res.send({
            data: user,
            message: 'get user successfully'
        });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }

});

//getAllUsers
router.get('/', async (req, res) => {
    const users = await USERS_CONTROLLER.getAllUsers();
    res.send({
        data: users,
        message: 'get all users successfully'
    });
});

//updateUser
router.patch('/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);;
        const userData = req.body;

        const update = await USERS_CONTROLLER.updateUserById(userId, userData);
        res.send({
            data: {
                username: userData.username,
                email: userData.email,
                name: userData.name,
                phone: userData.phone
            },
            message: 'user updated'
        });

    } catch (err) {
        res.status(400).send({ message: err.message });

    }

});

//deleteUser
router.delete('/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        await USERS_CONTROLLER.deleteUserById(userId);

        res.send({ message: 'user deleted successfully' });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;
