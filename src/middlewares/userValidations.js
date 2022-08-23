const { body } = require("express-validator");

const userCreateValidation = () => {
    return [
        body("nome")
            .isString()
            .withMessage("O nome é obrigatório."),
        body("email")
            .isString()
            .withMessage("O e-mail é obrigatório.")
            .isEmail()
            .withMessage("Insira e-mail válido."),
        body("senha")
            .isString()
            .withMessage("A senha é obrigatória.")
            .isLength({ min: 6 })
            .withMessage("A senha precisa ter no mínimo 6 caracteres."),
        body("confirmsenha")
            .isString()
            .withMessage("A senha é obrigatória.")
            .custom((value, { req }) => {
                if (value != req.body.senha) {
                    throw new Error("As senhas não são iguais")
                }
                return true;
            }),
    ];
};

const loginValidation = () => {
    return [
        body("email")
            .isString()
            .withMessage("O e-mail é obrigatório.")
            .isEmail()
            .withMessage("Insira e-mail válido."),
        body("senha")
            .isString()
            .withMessage("A senha é obrigatória.")
            .isLength({ min: 6 })
            .withMessage("A senha precisa ter no mínimo 6 caracteres."),

    ];
};

const userUpdateValidation = () => {
    return [
        body("nome")
            .optional()
            .isString()
            .withMessage("O nome é obrigatório."),
        body("senha")
            .optional()
            .isString()
            .withMessage("A senha é obrigatória.")
            .isLength({ min: 6 })
            .withMessage("A senha precisa ter no mínimo 6 caracteres."),
    ]
}

module.exports = {
    userCreateValidation,
    loginValidation,
    userUpdateValidation,
}