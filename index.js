

//invocacion express
const express = require("express")
const app = express()
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')


app.use(cookieParser())
//archivos estaticos
app.use(express.static('public'))

app.use('/estilos', express.static(__dirname + "/public/estilos"));
app.use('/imagenes', express.static(__dirname +"/public/imagenes"));
app.use('/js',express.static(__dirname +"/public/js"));



//uso de plantillas ejs



app.set("view engine", 'ejs')

//capturar los datos de los formularios
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//RUTAS
app.use('/', require('./rutas'))
app.use('/partidos', require('./rutas'))
app.use('/login', require('./rutas'))
app.use('/registro', require('./rutas'))

//setea
dotenv.config({path:'./env/.env'})






app.listen(3000,()=>{
    console.log("servidor corriendo en http://localhost:3000")
})



