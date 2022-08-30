const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// // Generate user token

const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "2h",
    });
};

const register = async (req, res) => {
    const { nome, email, senha } = req.body
    //verificando se o usuario já foi cadastrado pelo email tabela User
    const userCadastrado = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })

    if (userCadastrado) {
        res.status(422).json({ errors: ["Já existe um usuário cadastrado com esse email."] })
        return
    }

    //  Gerando a senha
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(senha, salt)

    // Criando usuario

    const result = await prisma.user.create({
        data: {
            nome,
            email,
            senha: passwordHash
        },
    })

    if (!result) {
        res.status(422).json({ errors: ["Houve um erro tente mais tarde."] })
        return
    }

    return res.status(201).json({
        id: result.id,
        token: generateToken(result.id),
    })


}

// Login
const login = async (req, res) => {
    const { email, senha } = req.body
    const userExiste = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })


    // Verificado email
    if (!userExiste) {
        res.status(404).json({ errors: ["Usuáro não encontrado."] })
        return
    }

    if (!(await bcrypt.compare(senha, userExiste.senha))) {
        res.status(422).json({ errors: ["Senha inválida."] })
        return
    }


    return res.status(201).json({
        id: userExiste.id,
        profileImage: userExiste.profileImage,
        token: generateToken(userExiste.id),
    })
}

// Pegando usuário corrente
const getCurrentUser = async (req, res) => {
    const user = req.user

    res.status(200).json(user);
}

// Atualizando Usuário
const update = async (req, res) => {
    const { nome, senha } = req.body
    let profileImage = null
    if (req.file) {
        profileImage = req.file.filename
    }

    const userReq = req.user

    const user = await prisma.user.findUnique({ where: { id: userReq.id }, select: { id: true, nome: true, email: true, profileImage: true } })

    if (nome) {
        user.nome = nome
    }

    if (senha) {
        //  Gerando a senha
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(senha, salt)

        user.senha = passwordHash
    }
    
    if (profileImage) {
        user.profileImage = profileImage
    }
    try {

        const updateUser = await prisma.user.update({
            where: {
                id: req.user.id
            },
            data: {
                nome,
                senha: user.senha,
                profileImage: user.profileImage,
            },
        })

        return res.status(202).json(updateUser)
    } catch (error) {
        res.status(404).json({ error: error })
    }
}
module.exports = {
    register,
    login,
    getCurrentUser,
    update,
}