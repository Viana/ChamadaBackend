const express = require('express');
const router = express();

router.use("/api/users",require("./UserRouters"))

// const obreirosRouters = require('./ObreirosRouters');
// router.use('/obreiros', obreirosRouters);

// const chamadaRouters = require('./ChamadaRouters');
router.use("/api/chamada", require("./ChamadaRouters"));

router.get("/health", (req, res) => {
    return res.status(200).json("UP")
})

module.exports = router;