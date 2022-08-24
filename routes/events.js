/*
    Rutas de Events
    host + /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { isDate } = require('../helpers/isDate');

const { validarJwt } = require('../middlewares/validarJwt');
const { getEventos, crearEventos, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router();
// Todos las rutas tienen que pasar por  la valicion del JWT
router.use( validarJwt );

// Obtener eventos
router.get('/', getEventos );

// Crear un nuevo evento
router.post(
    '/', 
    [ // middlewares
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de termino es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEventos 
);

// Actualizar Evento
router.put('/:id', actualizarEvento );

// Borrar Evento
router.delete('/:id', eliminarEvento );

module.exports = router;