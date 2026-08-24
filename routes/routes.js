const verificarSesion = require ("../middlewares/authMiddleware");

const express = require('express');
const router = express.Router();

const auth = require('../controllers/authController');
const medicamentoController = require ("../controllers/medicamentoController");

router.post('/login', auth.login);

router.get('/medicamentos', verificarSesion, medicamentoController.obtenerTodos);

router.post('/medicamentos', verificarSesion, medicamentoController.agregar)

router.get('/prueba', verificarSesion, (req, res) => {
    res.json({
        mensaje: "acceso permitido",
        usuario: req.session.user
    });
});

module.exports = router;