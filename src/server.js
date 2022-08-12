const express = require('express');

const app = express();

app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json());

const obreirosRouters = require('./routers/ObreirosRouters');
app.use('/obreiros',obreirosRouters);

const chamadaRouters = require('./routers/ChamadaRouters');
app.use('/chamada',chamadaRouters);

app.get("/health", (req, res) => {
    return res.status(200).json("UP")
})

app.listen(3001, () => console.log("Serevr UP port 3001"))