const router = require('express').Router();
const Autor = require('../models/Autor');
const Libro = require('../models/Libro');
const Copia = require('../models/Copia');
const Edicion = require('../models/Edicion');
const Autorea = require('../models/Autorea');
//Autor
router.get('/ALEC/autor', async (req, res) => {
    const autores = await Autor.find().lean();
    res.render('ALEC/autor', { autores });
});

router.post('/ALEC/new_autor', async (req, res) => {
    const { nombre, apellido1, apellido2 } = req.body;
    const errors = [];
    if (!nombre) {
        errors.push({ text: 'Por favor inserte un nombre' })
    }
    if (!apellido1) {
        errors.push({ text: 'Por favor inserte el primer apellido' })
    }
    if (!apellido2) {
        errors.push({ text: 'Por favor inserte el segundo apellido' })
    }
    if (errors.length > 0) {
        const autores = await Autor.find().lean();
        res.render('ALEC/autor', {
            errors,
            nombre,
            apellido1,
            apellido2,
            autores
        });
    } else {
        const newAutor = new Autor({ nombre, apellido1, apellido2 });
        await newAutor.save();
        res.redirect('/ALEC/autor')
    }
});

router.get('/ALEC/edit_autor/:id', async (req, res) => {
    const autor = await Autor.findById(req.params.id).lean();
    res.render('ALEC/edit_autor', { autor });
});

router.post('/ALEC/edit_autor/:id', async (req, res) => {
    const { nombre, apellido1, apellido2 } = req.body;
    await Autor.findByIdAndUpdate(req.params.id, { nombre, apellido1, apellido2 });
    res.redirect('/ALEC/autor');
});

router.get('/ALEC/delete_autor/:id', async (req, res) => {
    await Autor.findByIdAndDelete(req.params.id).lean();
    res.redirect('/ALEC/autor');
});

//Libro
router.get('/ALEC/libro', async (req, res) => {
    const libros = await Libro.find().lean();
    res.render('ALEC/libro', { libros });
});

router.post('/ALEC/new_libro', async (req,res)=>{
    const {titulo, ISBN} = req.body;
    const errors = [];
    if (!titulo) {
        errors.push({ text: 'Por favor inserte un titulo' })
    }
    if(!ISBN){
        errors.push({text:'Por favor inserte un ISBN válido'})
    }
    if(errors.length>0){
        const libros = await Libro.find().lean();
        res.render('ALEC/libro', {
            errors,
            titulo,
            ISBN,
            libros
        });
    }else{
        const newLibro = new Libro({titulo,ISBN});
        await newLibro.save();
        res.redirect('/ALEC/libro')
    }
});

router.get('/ALEC/edit_libro/:id', async (req, res) => {
    const libro = await Libro.findById(req.params.id).lean();
    res.render('ALEC/edit_libro', { libro });
});

router.post('/ALEC/edit_libro/:id', async (req,res)=>{
    const {titulo,ISBN} = req.body;
    await Libro.findByIdAndUpdate(req.params.id,{titulo,ISBN});
    res.redirect('/ALEC/libro');
});

router.get('/ALEC/delete_libro/:id', async (req, res) => {
    await Libro.findByIdAndDelete(req.params.id).lean();
    res.redirect('/ALEC/libro');
});

//Autorea
router.get('/ALEC/autorea', async (req, res) => {
    const autoreas = await Autorea.find().lean();
    const autores = await Autor.find().lean();
    const libros = await Libro.find().lean();
    res.render('ALEC/autorea', { autoreas, autores, libros });
});

router.post('/ALEC/new_autorea', async (req, res) => {
    const { autor, libro } = req.body;
    const autor_t = await Autor.findById(autor).lean();
    const libro_t = await Libro.findById(libro).lean();
    const nombre = autor_t.nombre;
    const apellido1 = autor_t.apellido1;
    const apellido2 = autor_t.apellido2;
    const titulo = libro_t.titulo;
    const newAutorea = new Autorea({ nombre, apellido1, apellido2, titulo });
    await newAutorea.save();
    res.redirect('/ALEC/autorea')
});

router.get('/ALEC/edit_autorea/:id', async (req, res) => {
    const autorea = await Autorea.findById(req.params.id).lean();
    const autores = await Autor.find().lean();
    const libros = await Libro.find().lean();
    res.render('ALEC/edit_autorea', { autorea, autores, libros });
});

router.post('/ALEC/edit_autorea/:id', async (req, res) => {
    const { autor, libro } = req.body;
    const autor_t = await Autor.findById(autor).lean();
    const libro_t = await Libro.findById(libro).lean();
    const nombre = autor_t.nombre;
    const apellido1 = autor_t.apellido1;
    const apellido2 = autor_t.apellido2;
    const titulo = libro_t.titulo;
    await Autorea.findByIdAndUpdate(req.params.id, { nombre, apellido1, apellido2,titulo });
    res.redirect('/ALEC/autorea');
});

router.get('/ALEC/delete_autorea/:id', async (req, res) => {
    await Autorea.findByIdAndDelete(req.params.id).lean();
    res.redirect('/ALEC/autorea');
});

//Copia

router.get('/ALEC/copia', async (req, res)=>{
    const copia = await Copia.find().lean();
    res.render('ALEC/copia',{copia});
});

router.post('/ALEC/new_copia', async (req,res)=>{
    const {ISBN,numero} = req.body;
    const errors = [];
    if(!ISBN){
        errors.push({text:'Por favor Ingrese'})
    }
    if(!numero){
        errors.push({text:'Por favor ingrese el número de la copia'})
    }
    if(errors.length>0){
        const copia = await Copia.find().lean();
        res.render('ALEC/copia',{
            errors,
            ISBN,
            numero,
            copia
        });
    }else{
        const newCopia = new Copia({ISBN,numero});
        await newCopia.save();
        res.redirect('/ALEC/copia')
    }
});

router.get('/ALEC/edit_copia/:id', async (req,res)=>{
    const copia =  await Copia.findById(req.params.id).lean();
    res.render('ALEC/edit_copia',{copia});
});

router.post('/ALEC/edit_copia/:id', async (req,res)=>{
    const {ISBN,numero} = req.body;
    await Copia.findByIdAndUpdate(req.params.id,{ISBN,numero});
    res.redirect('/ALEC/copia');
});

router.get('/ALEC/delete_copia/:id', async (req,res)=>{
    await Copia.findByIdAndDelete(req.params.id).lean();
    res.redirect('/ALEC/copia');
});

//Edicion

router.get('/ALEC/edicion', async (req, res)=>{
    const edicion = await Edicion.find().lean();
    res.render('ALEC/edicion',{edicion});
});

router.post('/ALEC/new_edicion', async (req,res)=>{
    const {ISBN,titulo,year,idioma} = req.body;
    const errors = [];
    if(!ISBN){
        errors.push({text:'Por favor Ingrese'})
    }
    if(!titulo){
        errors.push({text:'Por favor ingrese el título de la edicion'})
    }
    if(!year){
        errors.push({text:'Por favor ingrese el año de la edicion'})
    }
    if(!idioma){
        errors.push({text:'Por favor ingrese el idioma de la edicion'})
    }

    if(errors.length>0){
        const edicion = await Edicion.find().lean();
        res.render('ALEC/edicion',{
            errors,
            ISBN,
            titulo,
            year,
            idioma
        });
    }else{
        const newEdicion = new Edicion({ISBN,titulo,year,idioma});
        await newEdicion.save();
        res.redirect('/ALEC/edicion')
    }
});

router.get('/ALEC/edit_edicion/:id', async (req,res)=>{
    const edicion =  await Edicion.findById(req.params.id).lean();
    res.render('ALEC/edit_edicion',{edicion});
});

router.post('/ALEC/edit_edicion/:id', async (req,res)=>{
    const {ISBN,titulo,year,idioma} = req.body;
    await Edicion.findByIdAndUpdate(req.params.id,{ISBN,titulo,year,idioma});
    res.redirect('/ALEC/edicion');
});

router.get('/ALEC/delete_edicion/:id', async (req,res)=>{
    await Edicion.findByIdAndDelete(req.params.id).lean();
    res.redirect('/ALEC/edicion');
});
module.exports = router;