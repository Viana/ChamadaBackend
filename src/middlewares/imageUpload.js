const multer = require("multer");
const path = require("path");

const imagemStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        let folder = ""
        if (req.baseUrl.includes("users")) {
            folder = "users"
        } else if (req.baseUrl.includes("fotos")) {
            folder = "fotos"
        }

        cb(null, `uploads/${folder}/`)

    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


const imageUpload = multer({
    storage: imagemStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("Por favor, envie apenas foto com extensão png ou jpg!"));
        }
        cb(undefined,true)
    }
})

module.exports = {imageUpload}