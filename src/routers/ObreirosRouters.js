const express = require('express')

const { PrismaClient } = require('@prisma/client');
const routers = express.Router()
const prisma = new PrismaClient();

//POST
routers.post('/', async (req, res) => {
    const { nome, cracha } = req.body;

    if (!nome) {
        return res.status(422).json('Campo nome é obrigatório')
    }
    try {
        const result = await prisma.Obreiros.create({
            data: {
                nome,
                cracha,
            },
        })
        return res.status(201).json(result)

    } catch (error) {
        return res.status(400).json(error)
    }
})

//GET
routers.get('/', async (req, res) => {
    try {
        const result = await prisma.obreiros.findMany()
        return res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ error: error })
    }
})

//GET by ID
routers.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req)
    try {
        const intId = parseInt(id);
        const obreiro = await prisma.obreiros.findUnique({ where: { id: intId } });
        if (!obreiro) {
            return res.status(422).json({ message: 'Obreiro não encontrado!' })
        }
        return res.status(200).json(obreiro)

    } catch (error) {
        res.status(404).json({ error: error })
    }
})

//GET by CRACHA
routers.get('/cracha/:cracha', async (req, res) => {
    const { cracha } = req.params;
    try {
        //verificando se o CRACHA existe na tabela de OBREIROS
        const crachaExiste = await prisma.obreiros.findMany({
            where: {
                cracha: parseInt(cracha),
            }
        })
        if (crachaExiste == "") {
            return res.status(422).json({ Msg: `Crachá número ${cracha} não existe` })
        }
        return res.status(200).json(crachaExiste)
    } catch (error) {
        res.status(404).json({ error: error })
    } 
})


//PUT by ID
routers.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, cracha } = req.body;
    try {
        const intId = parseInt(id);
        const obreiro = await prisma.obreiros.findUnique({ where: { id: intId } });
        if (!obreiro) {
            res.status(422).json({ message: 'Obreiro não encontrado!' })
            return
        }

        const updateObreiro = await prisma.obreiros.update({
            where: {
                id: intId
            },
            data: {
                nome,
                cracha,
            },
        })

        return res.status(202).json(updateObreiro)

    } catch (error) {
        res.status(404).json({ error: error })
    }
})

//DELETE by ID
routers.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const intId = parseInt(id);
        const obreiro = await prisma.obreiros.findUnique({ where: { id: intId } });
        if (!obreiro) {
            res.status(422).json({ message: 'Obreiro não encontrado!' })
            return
        }

        const deleteObreiro = await prisma.obreiros.delete({
            where: {
                id: intId
            },
        })

        return res.status(204).json({ message: 'Obreiro removido' })

    } catch (error) {
        res.status(404).json({ error: error })
    }
})

module.exports = routers