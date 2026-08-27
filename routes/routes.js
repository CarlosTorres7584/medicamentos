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

router.delete('/medicamentos/:id', verificarSesion, medicamentoController.eliminar)

//router.delete('/medicamentos/:id',(req, res)=>{
//    console.log("llego el delete");
  //  console.log("id:", req.params.id);
//
   // res.json({
     //   mensaje: "delete funciona",
       // id: req.params.id
//    })
//})

module.exports = router;