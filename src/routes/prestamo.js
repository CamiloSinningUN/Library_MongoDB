const router = require('express').Router();
const Prestamo = require('../models/Prestamo');

router.get('/prestamo/show', async (req, res)=>{
    const prestamos = await Prestamo.find().lean();
    res.render('prestamo/show',{prestamos});
});

router.post('/prestamo/new_prestamo', async (req,res)=>{
    const {RUT,numero,ISBN,Fecha_Devolucion,Fecha_Prestamo} = req.body;
    const errors = [];
    if(!RUT){
        errors.push({text:'Por favor inserte un RUT'})
    }
    if(!numero){
        errors.push({text:'Por favor inserte un numero'})
    }
    if(!ISBN){
        errors.push({text:'Por favor inserte el primer ISBN'})
    }
    if(!Fecha_Prestamo){
        errors.push({text:'Por favor inserte la fecha de Prestamo'})
    }
    if(!Fecha_Devolucion){
        errors.push({text:'Por favor inserte la fecha de devolución'})
    }
    console.log(Fecha_Devolucion);

    if(errors.length>0){
        const prestamos = await Prestamo.find().lean();
        res.render('prestamo/show',{
            errors,
            RUT,
            numero,
            ISBN,
            Fecha_Prestamo,
            Fecha_Devolucion,
            
            prestamos
        });
    }else{
        const newPrestamo = new Prestamo({RUT,numero,ISBN,Fecha_Prestamo,Fecha_Devolucion});
        await newPrestamo.save();
        res.redirect('/prestamo/show')
    }
});

router.get('/prestamo/edit_prestamo/:id', async (req,res)=>{
    const prestamo =  await Prestamo.findById(req.params.id).lean();
    res.render('prestamo/edit_prestamo',{prestamo});
});

router.post('/prestamo/edit_prestamo/:id', async (req,res)=>{
    const {RUT,numero,ISBNFecha_Prestamo,Fecha_Devolucion} = req.body;
    await Prestamo.findByIdAndUpdate(req.params.id,{RUT,numero,ISBN,Fecha_Prestamo,Fecha_Devolucion});
    res.redirect('/prestamo/edit_prestamo');
});

router.get('/prestamo/delete_prestamo/:id', async (req,res)=>{
    await Prestamo.findByIdAndDelete(req.params.id).lean();
    res.redirect('/prestamo/show');
});

module.exports = router;