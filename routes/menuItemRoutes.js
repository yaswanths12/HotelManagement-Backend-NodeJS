const express=require('express')
const router=express.Router();
const MenuItem=require('../models/MenuItem')

//POST method to add a menu item
router.post('/',async(req,res)=>{
    try{
        const data = req.body 
        const newMenu =new MenuItem(data)
        const response=await newMenu.save();
        console.log('data saved')
        res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Internal Sever Error'})
    }
})

//GET method to fetch the Menu
router.get('/',async(req,res)=>{
    try{
        const data=await MenuItem.find();
        console.log('data fetchd successfully')
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Sever Error'})

    }
})

// menu/taste
router.get('/:taste',async(req,res)=>{
    try{
        // const data=await MenuItem.find();
        // console.log('data fetchd successfully')
        // res.status(200).json(data);
        const taste = req.params.taste; // Extract the work type from the URL parameter  'sweet','spicy','sour'
        if(taste=='sweet' || taste=='spicy' || taste=='sour'){
            const response = await MenuItem.find({work:taste});
            console.log('response fetched')
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'Invalid work type'})
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Sever Error'})

    }
})

module.exports=router;