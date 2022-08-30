const express = require('express')
const cors = require("cors");
const { PrismaClient } = require('@prisma/client');
const routers = express.Router()
const { format } = require('date-fns');
require('dotenv').config()


const router = express.Router()
// const { format } = require('date-fns');
// require('dotenv').config()


// Controller
const { register ,getChamada,getChamadaByCracha,updateChamadaById,deleteChamadabyId} = require('../controllers/ChamadaController.js');

// Middlewares
const validate = require("../middlewares/handleValidation");
const authGuard = require('../middlewares/authGuard.js');
const { chamadaValidation } = require('../middlewares/chamadaValidations.js');

// Routes
router.post("/register",authGuard, chamadaValidation(),validate, register)
router.get("/",authGuard, chamadaValidation(),getChamada)
router.get("/cracha/:cracha",authGuard, chamadaValidation(),getChamadaByCracha)
router.put("/:id",authGuard, chamadaValidation(),updateChamadaById)
router.delete("/:id",authGuard, chamadaValidation(),deleteChamadabyId)

module.exports = router;

// const prisma = new PrismaClient();
// routers.use(cors())

// //POST
// // routers.options('//:id', cors())
// routers.post('/', cors(), async (req, res) => {
//     const { cracha } = req.body;

//     // campo CRACHA é obrigatório
//     if (!cracha) {
//         return res.status(422).json({ Msg: 'Campo nome é obrigatório' })
//     }

//     //verificando se o CRACHA já foi inserido
//     const crachaRegistrado = await prisma.chamada.findMany({
//         where: {
//             cracha: cracha,
//             dataCriacao: {
//                 gte: new Date(format(new Date(), "yyyy-MM-dd"))
//             }
//         }
//     })

//     if (crachaRegistrado != "") {
//         return res.status(422).json({ Msg: `Chamada já inserida para o número ${cracha}` })
//     }



//      //verificando se o CRACHA existe na tabela de OBREIROS
//      const crachaExiste = await prisma.obreiros.findMany({
//         where: {
//             cracha: cracha,
//         }
//     })

//     if (crachaExiste == "") {
//         return res.status(422).json({ Msg: `Crachá número ${cracha} não existe` })
//     }

//     // Variavel hora vai receber o valor das variáveis HORA_REUNIAO colocadas no arquivo .env
//     // Se no momento da inserção a hora for menor que 6:30 damanhã vaiar a HORA_REUNIAO_1
//     var hora = format(new Date(), 'HH:mm:ss') <= '06:30:00' ? process.env.HORA_REUNIAO_1 : process.env.HORA_REUNIAO_2
//     // Vendo a hora pra ver se é PRESENTE ou ATRASADO
//     var valorStatus = format(new Date(), 'HH:mm:ss') <= hora ? 'Presente' : 'Atrasado'

//     try {
//         const result = await prisma.chamada.create({
//             data: {
//                 cracha,
//                 status: valorStatus,
//                 dataCriacao: new Date(),
//                 // dataCriacao: format(new Date(), 'dd/MM/yyyy HH:mm:ss'),
//             },
//         })
//         return res.status(201).json(result)

//     } catch (error) {
//         return res.status(400).json(error)
//     }
// })

// //GET
// routers.get('/', async (req, res) => {
//     try {
//         const result = await prisma.chamada.findMany()
//         return res.status(200).json(result)
//     } catch (error) {
//         res.status(404).json({ error: error })
//     }
// })

// //GET by ID
// routers.get('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const intId = parseInt(id);
//         const numChamada = await prisma.chamada.findUnique({ where: { id: intId } });
//         if (!numChamada) {
//             res.status(422).json({ message: 'Número  não encontrado!' })
//             return
//         }
//         return res.status(200).json(numChamada)

//     } catch (error) {
//         res.status(404).json({ error: error })
//     }
// })

// //PUT by ID
// routers.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const { cracha, status, dataCriacao } = req.body;
//     try {
//         const intId = parseInt(id);
//         const numChamada = await prisma.chamada.findUnique({ where: { id: intId } });
//         if (!numChamada) {
//             res.status(422).json({ message: 'Obreiro não encontrado!' })
//             return
//         }

//         const updateChamada = await prisma.chamada.update({
//             where: {

//                 id: intId
//             },
//             data: {
//                 cracha,
//                 status,
//                 dataCriacao
//             },
//         })

//         return res.status(202).json(updateChamada)

//     } catch (error) {
//         res.status(404).json({ error: error })
//     }
// })

// //DELETE by ID
// routers.delete('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const intId = parseInt(id);
//         const numChamada = await prisma.chamada.findUnique({ where: { id: intId } });
//         if (!numChamada) {
//             res.status(422).json({ message: 'Obreiro não encontrado!' })
//             return
//         }

//         const deleteChamada = await prisma.chamada.delete({
//             where: {
//                 id: intId
//             },
//         })

//         return res.status(204).json({ message: 'Chamada removida' })

//     } catch (error) {
//         res.status(404).json({ error: error })
//     }
// })































// //GET
// routers.get('/', async (req, res) => {
//     try {
//         const result = await prisma.obreiros.findMany()
//         return res.status(200).json(result)
//     } catch (error) {
//         res.status(404).json({ error: error })
//     }
// })

// //GET by ID
// routers.get('/:id', async (req, res) => {
//     const { id } = req.params;
//     console.log(req)
//     try {
//         const intId = parseInt(id);
//         const obreiro = await prisma.obreiros.findUnique({ where: { id: intId } });
//         if (!obreiro) {
//             res.status(422).json({ message: 'Obreiro não encontrado!' })
//             return
//         }
//         return res.status(200).json(obreiro)

//     } catch (error) {
//         res.status(404).json({ error: error })
//     }
// })

// //PUT by ID
// routers.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const { nome, cracha } = req.body;
//     try {
//         const intId = parseInt(id);
//         const obreiro = await prisma.obreiros.findUnique({ where: { id: intId } });
//         if (!obreiro) {
//             res.status(422).json({ message: 'Obreiro não encontrado!' })
//             return
//         }

//         const updateObreiro = await prisma.obreiros.update({
//             where: {
//                 id: intId
//             },
//             data: {
//                 nome,
//                 cracha,
//             },
//         })

//         return res.status(202).json(updateObreiro)

//     } catch (error) {
//         res.status(404).json({ error: error })
//     }
// })

// //DELETE by ID
// routers.delete('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const intId = parseInt(id);
//         const obreiro = await prisma.obreiros.findUnique({ where: { id: intId } });
//         if (!obreiro) {
//             res.status(422).json({ message: 'Obreiro não encontrado!' })
//             return
//         }

//         const deleteObreiro = await prisma.obreiros.delete({
//             where: {
//                 id: intId
//             },
//         })

//         return res.status(204).json({ message: 'Obreiro removido' })

//     } catch (error) {
//         res.status(404).json({ error: error })
//     }
// })

// module.exports = routers