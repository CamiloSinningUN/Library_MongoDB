
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
        const copia = await copia.find().lean();
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