const express = require('express')
const mongoose = require('mongoose')
const Travel = require('./models/travelModel')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : false})) //if we want to use form instead of Json data
//const port = process.env.port || 3000;
//app.listen(port,() => console.log(`listen to port ${port}....`));
//routes
app.get('/', (req, res)=>{

 res.send('Hello  hi Node API')

})
app.get('/blog', (req, res)=>{

    res.send('Hello blog ')
   
   })
   // get all
   app.get('/travels', async(req, res)=>{
    try {
        const travels = await Travel.find({});
    res.status(200).json(travels);

    } catch (error) {
        res.status(500).json({message:error.message})
    }
    })
    //fetch only item by item id
    app.get('/travels/:id', async(req, res)=>{
          try {
            const{id}=req.params;
            const travel = await Travel.findById(id);
             res.status(200).json(travel);
    
        } catch (error) {
            res.status(500).json({message:error.message})
        }
        })
        //add new 
   app.post('/travels' , async(req, res)=>{
   try{

    const travels = await Travel.create(req.body)
    res.status(200).json(travels);

   }catch(error){

    console.log(error.message);
    res.status(500).json({message:error.message})
    }
    })
    //update 
    app.put('/travels/:id' , async(req, res)=>{
        try{
            const{id}=req.params;
         const travel = await Travel.findByIdAndUpdate(id, req.body);//we need id and req from client for body)
         // we cant find anything in Database
         if(!travel){
            res.status(404).json({message: `cannot find the information with ID ${id}`})
         }
         const updatedTravel = await Travel.findById(id);//we want latest info fra database,stop returning the old data
         //if we found id the 
         res.status(200).json(updatedTravel);
         
         }catch(error){
         res.status(500).json({message:error.message})
         }
         })
         //delet the product

         app.delete('/travels/:id' , async(req, res)=>{
            try{
                const{id}=req.params;
             const travel = await Travel.findByIdAndDelete(id);//we need id and req from client for body)
             // we cant find anything in Database
             if(!travel){
                res.status(404).json({message: `cannot find the information with ID ${id}`})
             }
            //if we found id the 
              res.status(200).json(updatedTravel);
             
             }catch(error){
             res.status(500).json({message:error.message})
             }
             })
mongoose.connect('mongodb://127.0.0.1:27017/travel_destinations')
.then(()=>{
    app.listen(3000,()=>{
        console.log('Node API app is running on port 3000')
        })
    console.log('connected to MongoDB')
}).catch(()=>{
    console.log(error)
})
