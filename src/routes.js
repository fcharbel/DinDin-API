const express = require("express");
const { createUser, login, detailUser, updateUser } = require("./controllers/userController");
const authenticatedUser = require("./middlewares/authentication");
const validateReqBody = require("./middlewares/validateReqBody");
const userSchema = require("./validations/userSchema");
const getCategories = require("./controllers/categoryController");

const routes = express();

routes.post('/usuario', validateReqBody(userSchema), createUser);
routes.post('/login', login);

routes.use(authenticatedUser);

routes.get('/usuario', detailUser);
routes.put('/usuario', updateUser);

routes.get('/categoria', getCategories);

module.exports = routes;