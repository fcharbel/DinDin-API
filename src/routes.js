const express = require("express");
const { createUser, login, detailUser, updateUser } = require("./controllers/userController");
const authenticatedUser = require("./middlewares/authentication");

const routes = express();

routes.post('/user', createUser);
routes.post('/login', login);

routes.use(authenticatedUser);

routes.get('/user', detailUser);
routes.put('/user', updateUser);

module.exports = routes;