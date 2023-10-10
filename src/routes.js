const express = require("express");
const { createUser, login, detailUser, updateUser } = require("./controllers/userController");
const authenticatedUser = require("./middlewares/authentication");
const validateReqBody = require("./middlewares/validateReqBody");
const userSchema = require("./validations/userSchema");

const routes = express();

routes.post('/user', validateReqBody(userSchema), createUser);
routes.post('/login', login);

routes.use(authenticatedUser);

routes.get('/user', detailUser);
routes.put('/user', updateUser);

module.exports = routes;