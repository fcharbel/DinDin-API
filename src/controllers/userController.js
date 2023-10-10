const bcrypt = require('bcrypt');
const knex = require('../connection');
const jwt = require('jsonwebtoken');
const jwtPass = require('../jwtPass');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        const userExist = await knex('usuarios').where({ email }).first();

        if ((userExist)) {
            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' });
        }

        const encryptedPass = await bcrypt.hash(password, 10);

        const newUser = await knex('usuarios')
            .insert({
                nome: name,
                email,
                senha: encryptedPass,
            })
            .returning('*');

        const { senha: _, ...user } = newUser[0];

        return res.status(201).json(user);

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExist = await knex('usuarios').where({ email }).first();

        if (!userExist) {
            return res.status(400).json({ mensagem: 'Usuário e/ou senha inválido(s).' });
        }

        const { senha: userPassword, ...user } = userExist;

        const passwordValid = await bcrypt.compare(password, userPassword);

        if (!passwordValid) {
            return res.status(404).json({ mensagem: 'Usuário e/ou senha inválido(s).' });
        }

        const token = jwt.sign({ id: userExist.id }, jwtPass, { expiresIn: '8h' });

        return res.json({ user, token })

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const detailUser = async (req, res) => {
    const { id } = req.user;

    try {
        const loggedUser = await knex('usuarios').where({ id }).first();

        const { senha, ...user } = loggedUser;

        return res.status(201).json(user);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro do servidor' });
    }
}

const updateUser = async (req, res) => {
    const { name, email, password } = req.body;
    const { id } = req.user;

    try {
        const encryptedPass = await bcrypt.hash(password, 10);

        const userExist = await knex('usuarios')
            .where('email', '=', email)
            .whereNot('id', '=', id)
            .first();

        if (userExist) {
            return res.status(400).json({ mensagem: 'O e-mail informado já está sendo utilizado por outro usuário.' });
        }

        const updatedUser = await knex('usuarios')
            .where({ id })
            .update({
                nome: name,
                email,
                senha: encryptedPass
            })

        return res.status(200).json({ mensagem: 'Usuario Atualizado' });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro do servidor' });
    }
}



module.exports = {
    createUser,
    login,
    detailUser,
    updateUser
};