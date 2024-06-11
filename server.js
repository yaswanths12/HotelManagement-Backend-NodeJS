const express = require('express')
const app = express()
const db=require('./db')


const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

app.get('/', function (req, res) {
  res.send('Hello,Welocome to the hotel ,how can I help uh..We have list of items in Menu !')
})

// app.get('/chicken',function(req,res){
//     var Cust_Chicken={
//         name:"fresh chicken",
//         quantity:2,
//         is_legpieces:true,
//     }
//     res.send(Cust_Chicken)
// })





//Import router files
const personRoutes = require('./routes/personRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes')
//Use routers
app.use('/person',personRoutes)
app.use('/menu',menuItemRoutes)

app.listen(3000,()=>{
    console.log("Listening on port 3000");
})