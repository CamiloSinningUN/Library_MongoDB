//Una consulta que muestre un listado de las copias de libros 
//que se tienen incluyendo información de AUTOR, LIBRO, EDICIÓN y COPIA

db.getCollection("copia").aggregate([
{
'$lookup':{
  from: 'edicion',
  localField:'ISBN',
  foreignField:'ISBN',
  as: 'cod'
}
},{

'$unwind':'$cod'
},{
'$lookup':{
  from: 'autorea',
  localField:'cod.titulo',
  foreignField:'titulo',
  as: 'datos'
}
},{
'$unwind':'$datos'
},{
'$addFields':{
'nombreCompleto':{
'$concat':[
'$datos.nombre',' ','$datos.apellido1',' ','$datos.apellido2'
]
}
}
},{

'$project':{
'_id':0,
'nombreCompleto':1,
'libro':'$cod.titulo',
'edicion':'$isbn',
'copia':'$numero'
}
}
]).pretty()

//Un listado de los libros prestados por un usuario.

db.usuario.aggregate([
{
'$lookup':{
  from: 'prestamo',
  localField:'RUT',
  foreignField:'RUT',
  as: 'num'
}
},{

'$unwind':'$num'
},{
'$lookup':{
  from: 'copia',
  localField:'num.ISBN',
  foreignField:'ISBN',
  as: 'copia'
}
},{
'$unwind':'$copia'
},{
'$lookup':{
  from: 'edicion',
  localField:'copia.ISBN',
  foreignField:'ISBN',
  as: 'edicion'
}
},{
'$unwind':'$edicion'
},{
'$addFields':{
'nombreCompleto':{
'$concat':[
'$nombre',' ','$apellido1',' ','$apellido2'
]
}
}
},{

'$project':{
'_id':0,
'nombreCompleto':1,
'RUT':'$RUT',
'titulo':'$edicion.titulo'
}
}
]).pretty()