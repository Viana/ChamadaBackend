const express = require('express');
require('dotenv').config();
const cors = require("cors");
const app = express();
const port = process.env.PORT

// configuração Json
app.use(express.urlencoded({ extended: true, }))
app.use(express.json());

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

const router = require('./routers/Router.js')

app.use(router);

app.listen(port, () => console.log(`Serevr UP port ${port}`))