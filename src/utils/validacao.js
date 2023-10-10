const validacaoCamposUsuarios = (nome, email, senha) => {

    if (!nome || nome.trim() === '') {
        return false
    }

    if (!email || email.trim() === '') {
        return false
    }

    if (!senha || senha.trim() === '') {
        return false
    }
    return true
}

const validacaoCamposLogin = (email, senha) => {

    if (!email || email.trim() === '') {
        return false
    }

    if (!senha || senha.trim() === '') {
        return false
    }
    return true
}


const validacaoCamposTransacao = (descricao, valor, categoria_id, tipo) => {

    if (!descricao || descricao.trim() === '') {
        return false
    }

    if (!valor) {
        return false
    }

    if (!categoria_id) {
        return false
    }

    if (!tipo || tipo.trim() === '') {
        return false
    }
    return true
}

const validacaoTipoTransacao = (tipo) => {
    if (tipo === 'entrada' || tipo === 'saida') {
        return true
    }
    return false
}

const validacaoValorTransacao = (valor) => {
    if (valor < 0) {
        return false
    }
    return true
}

module.exports = {
    validacaoCamposUsuarios,
    validacaoCamposTransacao,
    validacaoTipoTransacao,
    validacaoValorTransacao,
    validacaoCamposLogin
}

