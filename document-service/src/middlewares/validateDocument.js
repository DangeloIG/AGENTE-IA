const { body, validationResult } = require('express-validator');

const validarDocumento = [
  body('asunto')
    .notEmpty()
    .withMessage('El campo "asunto" es obligatorio'),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];

module.exports = { validarDocumento };
