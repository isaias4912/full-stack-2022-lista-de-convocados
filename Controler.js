
//invoca bcryptjs
const bcryptjs = require('bcryptjs')
//coneccion con base
const conexion = require('./database/bd')
//jwt
const jwt= require('jsonwebtoken')

const {promisify} = require('util')


function DeterminarIdPosicion(posicion) {
    if (posicion == "Delantero") {
        id_posicion = 4
    } else if (posicion == "Arquero") {
        id_posicion = 1
    } else if (posicion == "Defensor") {
        id_posicion = 2
    } else {
        id_posicion = 3
    }

    return id_posicion

}

function determinar_id_rol(rol) {
    if (rol == "admin") {
        id_rol = 1
    } else {
        id_rol = 2
    }

    return id_rol
}
function DeterminarId(estadio) {
    if (estadio == "AL THUMANA") {
        id_estadio = 1
    } else if (estadio == "AL BAYT") {
        id_estadio = 2
    } else if (estadio == "AL RAYYAN") {
        id_estadio = 3
    } else if (estadio == "RAS ABU ABOUD") {
        id_estadio = 4
    } else if (estadio == "AL JANOUB") {
        id_estadio = 5
    } else if (estadio == "EDUCATION CITY") {
        id_estadio = 6
    } else if (estadio == "STADIUM 974") {
        id_estadio = 7
    } else {
        id_estadio = 8
    }

    return id_estadio
}




//agregar jugador 
exports.save = (req, res) => {
    const posicion = req.body.posicion
    console.log(posicion)
    const id_posicion = DeterminarIdPosicion(posicion)
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const camiseta = req.body.num_camiseta
    const imagen = req.body.imagen
    console.log(id_posicion, nombre, apellido, camiseta, imagen)
    var sql = "INSERT INTO `jugadores` (`nombre`,`apellido`,`num_camiseta`,`imagen`,`posicion_id_posicion`) VALUES ('" + nombre + "', '" + apellido + "', '" + camiseta + "','" + imagen + "', '" + id_posicion + "')";
    conexion.query(sql, (err, results) => {
        if (!err) {
            res.redirect("/")

        } else {
            throw err;
        }
    })



}
//actualizar jugadores

exports.update = (req, res) => {
    const id_jugadores = req.body.id_jugadores
    const posicion = req.body.posicion
    const posicion_id_posicion = DeterminarIdPosicion(posicion)
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const num_camiseta = req.body.num_camiseta
    const imagen = req.body.imagen
    console.log(id_jugadores, posicion_id_posicion, nombre, apellido, num_camiseta, imagen)
    conexion.query('UPDATE jugadores SET ? WHERE id_jugadores = ?', [{ nombre: nombre, apellido: apellido, num_camiseta: num_camiseta, imagen: imagen, posicion_id_posicion: posicion_id_posicion }, id_jugadores], (error, results) => {
        if (!error) {
            res.redirect("/")

        } else {
            console.log(error)
        }

    })


}








exports.savepartido = (req, res) => {
    const equipo1 = req.body.equipo1
    const estadio = req.body.estadio
    const equipo2 = req.body.equipo2
    const id_estadio = DeterminarId(estadio)
    const fecha = req.body.fecha
    const hora = req.body.hora


    var sql = "INSERT INTO `partidos` (`fecha_partido`,`equipo_1`,`equipo_2`,`estadio_id_estadio`,`hora_partido`) VALUES ('" + fecha + "', '" + equipo1 + "', '" + equipo2 + "','" + id_estadio + "', '" + hora + "')";
    conexion.query(sql, (err, results) => {
        if (!err) {
            res.redirect("/partidos")

        } else {
            throw err;
        }
    })



}

exports.updatepartido = (req, res) => {
    const id_partidos = req.body.id_partidos
    const equipo_1 = req.body.equipo1
    const estadio = req.body.estadio
    const equipo_2 = req.body.equipo2
    const estadio_id_estadio = DeterminarId(estadio)
    const fecha_partido = req.body.fecha
    const hora_partido = req.body.hora
    console.log(equipo_2, equipo_1, estadio_id_estadio, fecha_partido, hora_partido)

    conexion.query('UPDATE partidos SET ? WHERE id_partidos = ?', [{ fecha_partido: fecha_partido, equipo_1: equipo_1, equipo_2: equipo_2, estadio_id_estadio: estadio_id_estadio, hora_partido: hora_partido }, id_partidos], (error, results) => {
        if (!error) {
            res.redirect("/partidos")

        } else {
            console.log(error)
        }

    })


}

exports.registro = async (req, res) => {
    const nombre = req.body.nombre
    const email = req.body.email
    const rol = req.body.rol
    const id_rol = determinar_id_rol(rol)
    const pass = req.body.pass
    //encriptar password
    let passwordHaash = await bcryptjs.hash(pass, 8);
    conexion.query('INSERT INTO usuarios SET ? ', { nombre_completo: nombre, email: email, contraseña: passwordHaash, rol_id_rol: id_rol }, async (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.render('registro', {
                alert: true,
                alertTitle: "Registracion",
                alertMessage: "¡Registro Exitoso!",
                alertIcon: "success",
                swowConfirmButton: false,
                timer: 1500,
                ruta: '/login'

            })
        }
    })

}

//autenticacion 
exports.login = async (req, res) => {
  try {
    const emailUser = req.body.email
    const passUser = req.body.pass
    
    if (!emailUser || !passUser) {

        console.log(emailUser, passUser)
        res.render('login', {
            alert: 'true',
            alertTitle: 'Advertencia',
            alertMessage: "ingrese un correo y contraseña",
            alertIcon: 'info',
            showConfirmButton: true,
            timer: false,
            ruta: 'login'
        })

    } else {
        conexion.query('SELECT * FROM usuarios WHERE email = ?', [emailUser], async (error, results) => {
            if (results.length == 0 || !(await bcryptjs.compare(passUser, results[0].contraseña))) {

                res.render('login', {
                    alert: 'true',
                    alertTitle: 'Error',
                    alertMessage: "Email  y/o contraseña incorrectas",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                })
            } else {
                
                


                //obtengo el nombre
               const name = results[0].nombre_completo
                console.log(emailUser, passUser)
                const id = results[0].id_usuarios
                console.log(id)
                //inicio de sesion ok SIN EXPIRACION TOKEN
                const token = jwt.sign({id_usuarios:id}, process.env.JWT_SECRETO)

                
               
                console.log("token:" + token + "para el usuario   " + name )

                const cookiesOptions = {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true

                }
                res.cookie('jwt', token, cookiesOptions)
                res.render('login', {
                     

                    alert:'true',
                    alertTitle:'Conexion exitosa',
                    alertMessage:"!login exitoso!",
                    alertIcon:'success',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: ''
                })

            }
        })
    }

    
  } catch (error) {
    console.log(error)
    
  }
   


}


//verificar si esta autenticado 
exports.isAuthenticated = async(req, res, next) =>{
    if(req.cookies.jwt){
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRETO)
            conexion.query('SECRET * FROM usuarios WHERE id_usuarios =?', [decodificada.id_usuarios],(error,results)=>{
                if(!results){return next()}
                console.log(req.user)
                req.user=result[0].nombre_completo
                console.log(req.user)
                return next()
            })
            
        } catch (error) {
            console.log(error)
            return next()
            
        }
    }else{
        res.redirect('/index')
       
    }
}

exports.logout = (req, res)=>{
    res.clearCookie('jwt')
    return res.redirect('/index')
}



