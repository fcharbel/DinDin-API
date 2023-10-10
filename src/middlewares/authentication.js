const knex = require('../connection');
const jwt = require('jsonwebtoken');
const jwtPass = require('../jwtPass');


const authenticatedUser = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization);

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
    }

    const token = authorization.split(' ')[1];


    try {
        const { id } = jwt.verify(token, jwtPass);

        const userFound = await knex('usuarios').where({ id }).first();

        if (!userFound) {
            return res.status(404).json('Usuario não encontrado');
        }

        const { senha, ...user } = userFound;

        req.user = user;

        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })
    }
}

module.exports = authenticatedUser;