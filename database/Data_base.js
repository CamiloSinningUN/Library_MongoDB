use biblioteca
db.dropDatabase()

// colección (tabla) autor
db.autor.drop()
db.createCollection("autor")

// colección (tabla) autorea
db.autorea.drop()
db.createCollection("autorea")

// colección (tabla) libro
db.libro.drop()
db.createCollection("libro")

// colección (tabla) edicion
db.edicion.drop()
db.createCollection("edicion")

// colección (tabla) copia
db.copia.drop()
db.createCollection("copia")

// colección (tabla) prestamo
db.prestamo.drop()
db.createCollection("prestamo")

// colección (tabla) usuario
db.usuario.drop()
db.createCollection("usuario")



// insertando documentos (registros) en la colección (tabla) autor
db.autor.insert({"nombre":"Natalia","apellido1":"Osorio","apellido2":"Torres"})
db.autor.insert({"nombre":"Sara","apellido1":"Andrade","apellido2":"Velasquez"})
db.autor.insert({"nombre":"Tomas","apellido1":"Ramirez","apellido2":"Zapata"})
db.autor.insert({"nombre":"Sergio","apellido1":"Garcia","apellido2":"Tovar"})
db.autor.insert({"nombre":"Marta","apellido1":"Jimenez","apellido2":"Mejia"})

// insertando documentos (registros) en la colección (tabla) autorea
db.autorea.insert({"titulo":"La bella y la bestia","nombre":"Natalia","apellido1":"Osorio","apellido2":"Torres"})
db.autorea.insert({"titulo":"Las horas distantes","nombre":"Sara","apellido1":"Andrade","apellido2":"Velasquez"})
db.autorea.insert({"titulo":"Boulevard","nombre":"Tomas","apellido1":"Ramirez","apellido2":"Zapata"})
db.autorea.insert({"titulo":"El manuscrito","nombre":"Sergio","apellido1":"Garcia","apellido2":"Tovar"})
db.autorea.insert({"titulo":"Mi viaje sin ti","nombre":"Marta","apellido1":"Jimenez","apellido2":"Mejia"})

// insertando documentos (registros) en la colección (tabla) Libro
db.libro.insert({"titulo":"La bella y la bestia","ISBN":5756584898884})
db.libro.insert({"titulo":"Las horas distantes","ISBN":5756584898884})
db.libro.insert({"titulo":"Boulevard","ISBN":5756584898884})
db.libro.insert({"titulo":"El manuscrito","ISBN":5756584898884})
db.libro.insert({"titulo":"Mi viaje sin ti","ISBN":5756584898884})

// insertando documentos (registros) en la colección (tabla) edicion
db.edicion.insert({"ISBN":9852963072538,"titulo":"La bella y la bestia","year":2001,"idioma":"español"})
db.edicion.insert({"ISBN":9639726406192,"titulo":"Las horas distantes","year":2013,"idioma":"español"})
db.edicion.insert({"ISBN":9439295392026,"titulo":"Boulevard","year":2015,"idioma":"ingles"})
db.edicion.insert({"ISBN":9582036492640,"titulo":"El manuscrito","year":2005,"idioma":"español"})
db.edicion.insert({"ISBN":9730269351847,"titulo":"Mi viaje sin ti","year":2017,"idioma":"español"})

// insertando documentos (registros) en la colección (tabla) copia
db.copia.insert({"ISBN":9852963072538,"numero":23})
db.copia.insert({"ISBN":9639726406192,"numero":46})
db.copia.insert({"ISBN":9439295392026,"numero":52})
db.copia.insert({"ISBN":9582036492640,"numero":79})
db.copia.insert({"ISBN":9730269351847,"numero":38})

// insertando documentos (registros) en la colección (tabla) prestamo
db.prestamo.insert({"RUT":2836,"numero":23,"ISBN":9852963072538,"Fecha_Devolucion":new Date("2020,12,5"),"Fecha_Prestamo":new Date("2020,12,1")})
db.prestamo.insert({"RUT":7834,"numero":46,"ISBN":9639726406192,"Fecha_Devolucion":new Date("2020,2,28"),"Fecha_Prestamo":new Date("2020,2,1")})
db.prestamo.insert({"RUT":3652,"numero":52,"ISBN":9439295392026,"Fecha_Devolucion":new Date("2020,2,14"),"Fecha_Prestamo":new Date("2020,1,30")})
db.prestamo.insert({"RUT":6451,"numero":79,"ISBN":9582036492640,"Fecha_Devolucion":new Date("2021,5,23"),"Fecha_Prestamo":new Date("2021,3,18")})
db.prestamo.insert({"RUT":3865,"numero":38,"ISBN":9730269351847,"Fecha_Devolucion":new Date("2020,12,1"),"Fecha_Prestamo":new Date("2020,11,5")})

// insertando documentos (registros) en la colección (tabla) usuario
db.usuario.insert({"RUT":2836,"nombre":"Andrea","apellido1":"Sabogal","apellido2":"Ospina"})
db.usuario.insert({"RUT":7834,"nombre":"Carlos","apellido1":"Rodriguez","apellido2":"Sierra"})
db.usuario.insert({"RUT":3652,"nombre":"Maria","apellido1":"Arias","apellido2":"Zapata"})
db.usuario.insert({"RUT":6451,"nombre":"Marcos","apellido1":"Arteaga","apellido2":"Guardo"})
db.usuario.insert({"RUT":3865,"nombre":"Antonia","apellido1":"Suarez","apellido2":"Pinzon"})