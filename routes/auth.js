/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validarCampos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJwt } = require('../middlewares/validarJwt');

const router = Router();


router.post(
    '/new', 
    [ // middlewares
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de ser 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
);
router.post(
    '/',
    [ // middlewares
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de ser 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
);
router.get('/renew', validarJwt, revalidarToken);


module.exports = router;