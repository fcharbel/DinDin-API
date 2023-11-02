const knex = require('../connection');

const getTransaction = async (req, res) => {
    const { id } = req.user
    const { filtro } = req.query

    try {
        const query = knex('transacoes as t')
            .select('t.id', 't.tipo', 't.descricao', 't.valor', 't.data', 't.usuario_id', 't.categoria_id', 'c.descricao as categoria_nome')
            .leftJoin('categorias as c', 't.categoria_id', 'c.id')
            .where('t.usuario_id', id);

        if (filtro && filtro.length > 0) {
            query.whereIn('c.descricao', filtro);
        }

        const transactions = await query;

        return res.status(200).json(transactions)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro do servidor' })
    }
}

const detailTransaction = async (req, res) => {
    const { id } = req.params

    try {
        const transactionFound = await knex('transacoes as t')
            .select('t.id', 't.tipo', 't.descricao', 't.valor', 't.data', 't.usuario_id', 't.categoria_id', 'c.descricao as categoria_nome')
            .leftJoin('categorias as c', 't.categoria_id', 'c.id')
            .where('t.usuario_id', req.user.id)
            .andWhere('t.id', id);

        if (transactionFound.length === 0) {
            return res.status(404).json({ mensagem: 'Transação não encontrada' })
        }

        return res.status(200).json(transactionFound)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro do servidor' })
    }
}

const registerTransaction = async (req, res) => {
    const { descricao, valor, categoria_id, tipo } = req.body;

    try {
        const category = await knex('categorias')
            .where('id', categoria_id)
            .first();

        if (!category) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada.' })
        }

        const newTransaction = await knex('transacoes')
            .insert({
                descricao,
                valor,
                categoria_id,
                tipo,
                usuario_id: req.user.id
            })
            .returning('*');

        const newTransactionDetail = await knex('transacoes as t')
            .select(
                't.id',
                't.tipo',
                't.descricao',
                't.valor',
                't.data',
                't.usuario_id',
                't.categoria_id as categoria_id',
                'c.descricao as categoria_nome'
            )
            .leftJoin('categorias as c', 't.categoria_id', 'c.id')
            .where('t.usuario_id', req.user.id)
            .andWhere('t.id', newTransaction[0].id);

        return res.status(201).json(newTransactionDetail)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro do servidor' })
    }
}

module.exports = {
    getTransaction,
    detailTransaction,
    registerTransaction
}