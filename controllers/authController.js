const model = require('../models/usuarioModel');

exports.login = (req, res) =>{
    const usuario = req.body.usuario.trim();
    const password = req.body.password.trim();

     console.log('Datos recibidos:', usuario, password);


    model.getByUsuario(usuario, (err, user) =>{

        if (err) return res.status(500).json({ error: "Error en la base de datos"});

        if(!user){
            return res.status(401).json({error: "usuario no existe"});
        }

        if (user.password !== password){
            return res.status(401).json({error: "Password incorrecto"});
        }


/////// SE GUARDA LA SESION/////

        req.session.user = user;

        res.json({ok: true});
    })
}