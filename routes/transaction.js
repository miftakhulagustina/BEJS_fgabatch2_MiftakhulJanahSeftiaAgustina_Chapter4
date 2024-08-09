const express = require('express');
const router = express.Router();
const prisma = require('../db/prisma');

const TRANS_CONTROLLER = require('../controller/transaction-controller');

//create transaction
//get transaction
//get all transactions


router.get('/', async (req, res) => {
    const users = await USERS_CONTROLLER.getAllUsers();
    res.send({
        data: users,
        message: 'get all users successfully'
    });
});


module.exports = router;
