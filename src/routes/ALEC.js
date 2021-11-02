const router = require('express').Router();
const Autor = require('../models/Autor');
const Libro = require('../models/Libro');
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

router.post('/ALEC/new_libro', async (req, res) => {
    const { titulo } = req.body;
    const errors = [];
    if (!titulo) {
        errors.push({ text: 'Por favor inserte un titulo' })
    }
    if (errors.length > 0) {
        const libros = await Libro.find().lean();
        res.render('ALEC/libro', {
            errors,
            titulo,
            libros
        });
    } else {
        const newLibro = new Libro({ titulo });
        await newLibro.save();
        res.redirect('/ALEC/libro')
    }
});

router.get('/ALEC/edit_libro/:id', async (req, res) => {
    const libro = await Libro.findById(req.params.id).lean();
    res.render('ALEC/edit_libro', { libro });
});

router.post('/ALEC/edit_libro/:id', async (req, res) => {
    const { titulo } = req.body;
    await Libro.findByIdAndUpdate(req.params.id, { titulo });
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

module.exports = router;