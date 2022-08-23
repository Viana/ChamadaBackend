const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authGuard = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Verificando se o header possui o token
    if (!token) {
        return res.status(401).json({ errors: ["Acesso negado!"] });
    }

    // Verificando se o token é valido
    try {
        const verified = jwt.verify(token, jwtSecret);
        req.user = await prisma.user.findUnique({ where: { id: verified.id }, select: { id:true, nome: true, email: true } });
        next();
    } catch (error) {
        res.status(401).json({ errors: ["Token inválido"] });
    }
};

module.exports = authGuard
