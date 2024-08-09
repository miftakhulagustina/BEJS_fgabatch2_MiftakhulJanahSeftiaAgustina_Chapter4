
const express = require('express');
const dotenv = require('dotenv');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var accountRouter = require('./routes/account');
var userRouter = require('./routes/user');
var transactionRouter = require('./routes/transaction');

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Running on port " + PORT);
});


app.use('/api/v1/users', userRouter);
app.use('/api/v1', accountRouter);
app.use('/api/v1', transactionRouter);

module.exports = app;