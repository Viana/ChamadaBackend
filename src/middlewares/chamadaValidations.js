const { body } = require("express-validator");

const chamadaValidation = () => {
    return [
        body("cracha")
            .isInt()
            .isLength({ min: 1 })
            .withMessage("O número do crachá é obrigatório.")
    ];
};


module.exports = {
    chamadaValidation,
}