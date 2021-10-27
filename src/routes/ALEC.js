const router = require('express').Router();
const Autor = require('../models/Autor');

router.get('/ALEC/autor', async (req, res)=>{
    const autores = await Autor.find().lean();
    res.render('ALEC/autor',{autores});
});

router.post('/ALEC/new_autor', async (req,res)=>{
    const {nombre,apellido1,apellido2} = req.body;
    const errors = [];
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
        res.render('ALEC/autor',{
            errors,
            nombre,
            apellido1,
            apellido2
        });
    }else{
        const newAutor = new Autor({nombre,apellido1,apellido2});
        await newAutor.save();
        res.redirect('/ALEC/autor')
    }
});

module.exports = router;