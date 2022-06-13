const {Router} = require('express')
const router = Router()


const productos =[
{"title":"producto1","price":111,"thumbnail":"https//..1.com","id":0},
{"title":"producto2","price":222,"thumbnail":"https//..2.com","id":1},
{"title":"producto3","price":333,"thumbnail":"https//..3.com","id":2}
]



router.get('/productos', (req,res)=>{
    res.json(productos)
})
router.get('/productos/:id', (req,res)=>{
    const id= Number(req.params.id)
    if((isNaN(id))){
        res.status(400).json({error:'El Parametro no es un numero'})
        return
    }
    let encontrado = productos.find(producto => producto.id === id )
    if (encontrado){
        res.status(200).json(encontrado)
    }else{
        res.status(404).send({error:'producto no encontrado'})
    }
})
router.post('/productos', (req,res)=>{
    const {title, price, thumbnail}= req.body
    if(!title || !price || !thumbnail){
        res.status(400).json({error:'completa todos los campos'})
        return
    }
    let nuevoId = 0
    if(productos.length > 0){
        let ultimo = productos.length-1
        let objectId= productos[ultimo].id
        nuevoId = objectId +1
    }
    let nuevoProducto ={title, price, thumbnail,id:nuevoId}
   productos.push(nuevoProducto)
   res.json(nuevoProducto)
})
router.put('/productos/:id', (req,res)=>{
    const id= Number(req.params.id)
    const {title, price, thumbnail}= req.body

    if((isNaN(id))){
        res.status(400).json({error:'El Parametro no es un numero'})
        return
    }
    let encontrado = productos.findIndex(producto => producto.id === id )
        if (encontrado){
        productos[encontrado] ={title, price, thumbnail,id}
        res.status(200).json(productos)
    }else{
        res.status(404).send({error:'producto no encontrado'})
    } 
})
router.delete('/productos/:id', (req,res)=>{
    const id= Number(req.params.id)
    if((isNaN(id))){
        res.status(400).json({error:'El Parametro no es un numero'})
        return
    }
    let encontrado = productos.findIndex(producto => producto.id === id )
    
     if (encontrado){
        productos.splice(encontrado,1 )
        res.status(200).json(productos)
    }else{
        res.status(404).send({error:'producto no encontrado'})
    } 
})



module.exports= router