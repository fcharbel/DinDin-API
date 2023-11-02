const express = require("express");

const authenticatedUser = require("./middlewares/authentication");
const validateReqBody = require("./middlewares/validateReqBody");
const userSchema = require("./validations/userSchema");
const transactionSchema = require("./validations/transactionSchema");

const getCategories = require("./controllers/categoryController");
const { createUser, login, detailUser, updateUser } = require("./controllers/userController");
const { getTransaction, detailTransaction, registerTransaction } = require("./controllers/transactionController");

const routes = express();

routes.post('/usuario', validateReqBody(userSchema), createUser);
routes.post('/login', login);

routes.use(authenticatedUser);

routes.get('/usuario', detailUser);
routes.put('/usuario', updateUser);

routes.get('/categoria', getCategories);

routes.get('/transacao', getTransaction);
routes.get('/transacao/:id', detailTransaction);
routes.post('/transacao', validateReqBody(transactionSchema), registerTransaction);


module.exports = routes;