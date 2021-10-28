const router = require('express').Router();
const Usuario = require('../models/Usuario');

router.get('/usuario/show', async (req, res)=>{
    const usuarios = await Usuario.find().lean();
    res.render('usuario/show',{usuarios});
});

router.post('/usuario/new_usuario', async (req,res)=>{
    const {RUT,nombre,apellido1,apellido2} = req.body;
    const errors = [];
    if(!RUT){
        errors.push({text:'Por favor inserte un RUT'})
    }
    if(!nombre){
        errors.push({text:'Por favor inserte un nombre'})
    }
    if(!apellido1){
        errors.push({text:'Por favor inserte el primer apellido'})
    }
    if(!apellido2){
        errors.push({text:'Por favor inserte el segundo apellido'})
    }
    if(errors.length>0){
        const usuarios = await Usuario.find().lean();
        res.render('usuario/show',{
            errors,
            RUT,
            nombre,
            apellido1,
            apellido2,
            usuarios
        });
    }else{
        const newUsuario = new Usuario({RUT,nombre,apellido1,apellido2});
        await newUsuario.save();
        res.redirect('/usuario/show')
    }
});

router.get('/usuario/edit_usuario/:id', async (req,res)=>{
    const usuario =  await Usuario.findById(req.params.id).lean();
    res.render('usuario/edit_usuario',{usuario});
});

router.post('/usuario/edit_usuario/:id', async (req,res)=>{
    const {RUT,nombre,apellido1,apellido2} = req.body;
    await Usuario.findByIdAndUpdate(req.params.id,{RUT,nombre,apellido1,apellido2});
    res.redirect('/usuario/show');
});

router.get('/usuario/delete_usuario/:id', async (req,res)=>{
    await Usuario.findByIdAndDelete(req.params.id).lean();
    res.redirect('/usuario/show');
});

module.exports = router;