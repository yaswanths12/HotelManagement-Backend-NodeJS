const express=require('express')
const router=express.Router();
const Person=require('./../models/Person')
//POST method to add Person data 
router.post('/',async(req,res)=>{
    try{
        const data = req.body //Assuming the request body contains the person data

    //create a new person document using Mongoose model
    const newPerson =new Person(data)
   
        //Save the new person data in database
    const response=await newPerson.save();
    console.log('data saved')
    res.status(200).json(response);

    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Internal Sever Error'})
    }
})

//GET method to get the Person data

router.get('/',async(req,res)=>{
    try{
        const data=await Person.find();
        console.log('data fetchd successfully')
        res.status(200).json(data);

    }catch(err){
        console.log(error);
        res.status(500).json({error:'Internal Sever Error'})

    }
})

router.get('/:workType',async(req,res)=>{
    try{
        const workType = req.params.workType; // Extract the work type from the URL parameter
        if(workType=='chef' || workType=='manager' || workType=='waiter'){
            const response = await Person.find({work:workType});
            console.log('response fetched')
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'Invalid work type'})
        }

    }catch(error){
        console.log(error);
        res.status(500).json({error:'Internal Sever Error'})

    }

})

//Updating
router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id; //Extract id from the URL Parameter
        const updatedPersonData=req.body; //Updated data from the person

        const response= await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true
        })
        if(!response){
            return res.status(404).json({error:'Person not found'})
        }

    }catch(error){
        console.log(error);
        res.status(500).json({error:'Internal Sever Error'})
    }
})

module.exports=router;