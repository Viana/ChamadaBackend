// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')
// const jwtSecret = process.env.JWT_SECRET;
const { format } = require('date-fns');
const { zonedTimeToUtc } = require('date-fns/locale/pt-BR')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


//POST
// routers.options('//:id', cors())
const register = async (req, res) => {
    const { cracha } = req.body;
    
    //verificando se o CRACHA já foi inserido
    const crachaRegistrado = await prisma.chamada.findFirst({
        where: {
            cracha: parseInt(cracha),
            dataCriacao: {
                gte: new Date(format(new Date(), "yyyy-MM-dd"))
            }
        }
    })
   
    if (crachaRegistrado != null) {
        res.status(422).json({ errors: [`Chamada já inserida para crachá nº${cracha}`] })
        return
    }



    //verificando se o CRACHA existe na tabela de OBREIROS
    const crachaExiste = await prisma.obreiros.findFirst({
        where: {
            cracha: parseInt(cracha),
        }
    })

    if (crachaExiste == null) {
        return res.status(422).json({ errors: [`Crachá nº${cracha} não existe`] })
    }

    // Variavel hora vai receber o valor das variáveis HORA_REUNIAO colocadas no arquivo .env
    // Se no momento da inserção a hora for menor que 6:30 damanhã vaiar a HORA_REUNIAO_1
    var hora = format(new Date(), 'HH:mm:ss') <= '06:30:00' ? process.env.HORA_REUNIAO_1 : process.env.HORA_REUNIAO_2
    // Vendo a hora pra ver se é PRESENTE ou ATRASADO
    var valorStatus = format(new Date(), 'HH:mm:ss') <= hora ? 'Presente' : 'Atrasado'
    // let dataAtual = new Intl.DateTimeFormat(
    //     'pt-BR', {
    //     timeZone: 'America/Sao_Paulo',
    //     dateStyle: 'short',
    //     timeStyle: 'medium',

    // }).format(new Date())
    // console.log('................... ' + new Date().getUTCDay())

    try {
        const result = await prisma.chamada.create({
            data: {
                cracha:parseInt(cracha),
                status: valorStatus,
                dataCriacao: new Date(),

            },
        })
        return res.status(201).json(result)

    } catch (error) {
        return res.status(400).json(error)
    }
}

//GET
const getChamada = async (req, res) => {
    try {
        const result = await prisma.chamada.findMany()
        return res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ error: error })
    }
}

//GET by cracha
const getChamadaByCracha = async (req, res) => {
    const { cracha } = req.params;
    try {
        const intCracha = parseInt(cracha);

        const numChamada = await prisma.chamada.findMany({ where: { cracha: intCracha } });

        if (numChamada == null || numChamada == "") {
            res.status(404).json({ erros: [`Crachá nº${intCracha} não encontrado!`] })
            return
        }
        return res.status(200).json(numChamada)

    } catch (error) {
        res.status(404).json({ error: error })
    }
}

//PUT by ID
const updateChamadaById = async (req, res) => {
    const { id } = req.params;
    const { cracha, status, dataCriacao } = req.body;
    try {
        const intId = parseInt(id);
        const numChamada = await prisma.chamada.findUnique({ where: { id: intId } });
        if (!numChamada) {
            res.status(422).json({ erros: [`Crachá nº${intId} não encontrado!`] })
            return
        }

        const updateChamada = await prisma.chamada.update({
            where: {

                id: intId
            },
            data: {
                cracha,
                status,
                dataCriacao
            },
        })

        return res.status(202).json(updateChamada)

    } catch (error) {
        res.status(404).json({ error: error })
    }
}

//DELETE by ID
const deleteChamadabyId = async (req, res) => {
    const { id } = req.params;
    try {
        const intId = parseInt(id);
        const numChamada = await prisma.chamada.findUnique({ where: { id: intId } });
        if (!numChamada) {
            res.status(422).json({ erros: [`Crachá nº${intId} não encontrado!`] })
            return
        }

        const deleteChamada = await prisma.chamada.delete({
            where: {
                id: intId
            },
        })

        return res.status(204).json({ message: 'Chamada removida' })

    } catch (error) {
        res.status(404).json({ error: error })
    }
}

module.exports = {
    register,
    getChamada,
    getChamadaByCracha,
    deleteChamadabyId,
    updateChamadaById,

}
