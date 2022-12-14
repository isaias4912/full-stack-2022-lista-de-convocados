//rutas

const express = require('express');

const router = express.Router();
const conexion = require('./database/bd');



router.get("/index", (req, res)=>{
    res.render('index')
})



//ruta home de jugadores
router.get('/', (req, res)=>{
  
    
    conexion.query("SELECT jugadores.id_jugadores, jugadores.nombre, jugadores.apellido, jugadores.num_camiseta,jugadores.imagen, posicion.nombre_posicion FROM jugadores INNER JOIN posicion ON jugadores.posicion_id_posicion = posicion.id_posicion", (err, results) => {
        if(err){
            throw err;
        }else{
            
          
                         
            res.render("jugeditables", {results:results} )
        }
    })
   
})


//ruta de partidos
router.get('/partidos',  (req, res)=>{  
    
    conexion.query("SELECT partidos.id_partidos,partidos.fecha_partido, partidos.equipo_1, partidos.equipo_2, estadio.nombre_estadio, partidos.hora_partido FROM partidos INNER JOIN estadio ON partidos.estadio_id_estadio = estadio.id_estadio", (err, results) => {
        if(err){
            throw err;
        }else{  
                   
          
                         
            res.render("partidoseditable", {results:results})
        }
    })
   
})


// crear registros jugadores 
router.get("/create", (req, res)=>{
    res.render('nuevojug')
})

// crear registros partidos
router.get("/createpartido", (req, res)=>{
    res.render('nuevopart')
})

router.get("/login", (req, res)=>{
    res.render('login',{alert:false})
})
router.get("/registro", (req, res)=>{
    res.render('registro')
})





// editar registros jugadores
router.get('/edit/:id', (req, res)=>{
    const id= req.params.id
    
    conexion.query('SELECT * FROM jugadores WHERE id_jugadores=?',[id], (error, results)=>{
        if(error){
            throw error;
        }else{
            //usa jug como variable
                         
            res.render("modjug", {jug:results[0]})
        }

    })

})

//ruta para eliminar el registro  jugadores
router.get('/delete/:id',(req,res)=>{
    const id = req.params.id
    conexion.query('DELETE FROM jugadores WHERE id_jugadores= ?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{ 
            res.redirect('/')
        }                   
            
        })
    })

    //ruta para eliminar el registro  partido
router.get('/deletePartido/:id',(req,res)=>{
    const id = req.params.id
    conexion.query('DELETE FROM partidos WHERE id_partidos= ?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{ 
            res.redirect('/partidos')
            

           
        }                   
            
        })
    })


    // editar registros partido
router.get('/editPartido/:id', (req, res)=>{
    const id= req.params.id  
   
   
    conexion.query('SELECT * FROM partidos WHERE id_partidos=?',[id], (error, results)=>{
        if(error){
            throw error;
        }else{
            //usa part como variable              
           
            res.render("modpart", {part:results[0]})   


        }

    })

})   


const crud = require('./Controler')




//ruta de salvar y actualizar jugadores
router.post('/save', crud.save)
router.post('/update', crud.update)

//ruta de salvar y actualizar partidos

router.post('/savepartido', crud.savepartido)
router.post('/updatepartido', crud.updatepartido)

//usuarios

router.post('/registro', crud.registro)
router.post('/login', crud.login)
router.get('/logout', crud.logout)









module.exports=router
