const router = require('express').Router();
const Usuario = require('../models/Usuario');
const Copia = require('../models/Copia');
const { Mongoose } = require('mongoose');

router.get('/consulta/1', async (req, res) => {
    const con1 = await Copia.aggregate([
        {
            '$lookup': {
                from: 'edicion',
                localField: 'ISBN',
                foreignField: 'ISBN',
                as: 'cod'
            }
        }, {

            '$unwind': '$cod'
        }, {
            '$lookup': {
                from: 'autorea',
                localField: 'cod.titulo',
                foreignField: 'titulo',
                as: 'datos'
            }
        }, {
            '$unwind': '$datos'
        }, {
            '$addFields': {
                'nombreCompleto': {
                    '$concat': [
                        '$datos.nombre', ' ', '$datos.apellido1', ' ', '$datos.apellido2'
                    ]
                }
            }
        }, {

            '$project': {
                '_id': 0,
                'nombreCompleto': 1,
                'libro': '$cod.titulo',
                'edicion': '$ISBN',
                'copia': '$numero'
            }
        }
    ]);
    res.render('consultas/consulta_1', { con1 });
});

router.post('/consulta/2', async (req, res) => {
    const { RUT } = req.body;
    const errors = [];
    
    if (!RUT) {
        errors.push({ text: 'Por favor inserte un RUT' })
    }
    if (errors.length > 0) {
        res.render('consultas/consulta_2', {
            errors
        });
    } else {
        const con2 = await Usuario.aggregate([
            {
                '$match': {
                    'RUT': parseInt(RUT)
                }
            }, {
                '$lookup': {
                    from: 'prestamo',
                    localField: 'RUT',
                    foreignField: 'RUT',
                    as: 'num'
                }
            }, {

                '$unwind': '$num'
            }, {
                '$lookup': {
                    from: 'copia',
                    localField: 'num.ISBN',
                    foreignField: 'ISBN',
                    as: 'copia'
                }
            }, {
                '$unwind': '$copia'
            }, {
                '$lookup': {
                    from: 'edicion',
                    localField: 'copia.ISBN',
                    foreignField: 'ISBN',
                    as: 'edicion'
                }
            }, {
                '$unwind': '$edicion'
            }, {
                '$addFields': {
                    'nombreCompleto': {
                        '$concat': [
                            '$nombre', ' ', '$apellido1', ' ', '$apellido2'
                        ]
                    }
                }
            }, {

                '$project': {
                    '_id': 0,
                    'nombreCompleto': 1,
                    'RUT': '$RUT',
                    'titulo': '$edicion.titulo'
                }
            }
        ]);
        res.render('consultas/consulta_2', { con2, errors });
    }
});

module.exports = router;