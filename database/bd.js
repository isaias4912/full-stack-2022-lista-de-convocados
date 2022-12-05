const mysql = require("mysql")
//conexion con la basede datos
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    port: 3306,
    database: 'convocadosmundial'


})

conexion.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log("conectado puerto 3000")
})

module.exports= conexion