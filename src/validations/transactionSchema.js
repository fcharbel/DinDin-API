const joi = require('joi')

const transactionSchema = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'O campo descricao é obrigatório',
        'string.empty': 'O campo descricao é obrigatório',
    }),

    valor: joi.number().min(1).required().messages({
        'number.base': 'O campo valor precisa ser um número válido',
        'any.required': 'O campo valor é obrigatório',
        'any.empty': 'O campo valor é obrigatório',
        'number.min': 'Valor deve ser maior que 0'
    }),

    categoria_id: joi.number().min(1).required().messages({
        'any.required': 'O campo categoria_id é obrigatório',
        'number.base': 'O campo categoria_id deve ser um número válido',
        'number.min': 'categoria_id deve ser no mínimo 1',
    }),
    tipo: joi.string().valid('entrada', 'saida').required().messages({
        'any.required': 'O campo tipo é obrigatório',
        'string.empty': 'O campo tipo é obrigatório',
        'any.only': 'O campo tipo deve ser "entrada" ou "saida"',
    }),
})

module.exports = transactionSchema;