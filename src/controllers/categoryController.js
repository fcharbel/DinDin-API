const knex = require('../connection');

const getCategories = async (req, res) => {

    try {
        const categories = await knex('categorias');

        return res.status(201).json(categories);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro do servidor' })
    }
}


module.exports = getCategories;