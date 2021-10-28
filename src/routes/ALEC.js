const router = require('express').Router();
const Autor = require('../models/Autor');
const Libro = require('../models/Libro');

//Autor
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

router.get('/ALEC/edit_autor/:id', async (req,res)=>{
    const autor =  await Autor.findById(req.params.id).lean();
    res.render('ALEC/edit_autor',{autor});
});

router.post('/ALEC/edit_autor/:id', async (req,res)=>{
    const {nombre,apellido1,apellido2} = req.body;
    await Autor.findByIdAndUpdate(req.params.id,{nombre,apellido1,apellido2});
    res.redirect('/ALEC/autor');
});

router.get('/ALEC/delete_autor/:id', async (req,res)=>{
    await Autor.findByIdAndDelete(req.params.id).lean();
    res.redirect('/ALEC/autor');
});

//Libro
router.get('/ALEC/libro', async (req, res)=>{
    const libros = await Libro.find().lean();
    res.render('ALEC/libro',{libros});
});

router.post('/ALEC/new_libro', async (req,res)=>{
    const {titulo} = req.body;
    const errors = [];
    if(!titulo){
        errors.push({text:'Por favor inserte un titulo'})
    }
    if(errors.length>0){
        res.render('ALEC/libros',{
            errors,
            titulo
        });
    }else{
        const newLibro = new Libro({titulo});
        await newLibro.save();
        res.redirect('/ALEC/libro')
    }
});

router.get('/ALEC/edit_libro/:id', async (req,res)=>{
    const libro =  await Libro.findById(req.params.id).lean();
    res.render('ALEC/edit_libro',{libro});
});

router.post('/ALEC/edit_libro/:id', async (req,res)=>{
    const {titulo} = req.body;
    await Libro.findByIdAndUpdate(req.params.id,{titulo});
    res.redirect('/ALEC/libro');
});

router.get('/ALEC/delete_libro/:id', async (req,res)=>{
    await Libro.findByIdAndDelete(req.params.id).lean();
    res.redirect('/ALEC/libro');
});

module.exports = router;