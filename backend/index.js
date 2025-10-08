import dotenv from 'dotenv'
import express from "express"
import db_connect from './config/db/database.js'
import cors from "cors"
dotenv.config()

const app = express()
app.use(cors({
  origin: process.env.CORS || "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json())

let db;
;(async()=>{
     const client= await db_connect();
     db=client.db('todo');
})()


const port = process.env.PORT || 4000;

app.get('/h', (req, res) => {
  
  res.json({ "hello": "world" })
})

app.put('/data',async(req,res)=>{
      try {
    console.log('Received:', req.body)
    const mycoll = db.collection('todo')
    const result = await mycoll.insertOne(req.body)
    console.log('Inserted document ID:', result.insertedId)
    res.json({ message: 'data received', id: String(result.insertedId )})
  } catch (e) {
    console.error('Insert failed:', e)
    res.status(500).json({ error: e.message })
  }
})
    
app.get('/getlist',async(req,res)=>{
  try{
    const mycall= db.collection('todo');
    const data= await mycall.find({}).toArray()

    res.json(data);

  }catch (e){
     console.log(e);
    res.json({"_message":e})
  }

});

app.put('/markdone',async(req,res)=>{
  try{const mycall=db.collection('todo');
  console.log(req.body);
  const result=await mycall.updateOne(req.body,
    {'$set':{isDone:true}}
  )
   res.json({"_message":result})
  }
  catch(e){

    res.json({"_message":e})
  }

})

app.delete('/delete',async(req,res)=>{
   try{
     const mycall=db.collection('todo');
     console.log(req.body)
     const result=await mycall.deleteOne(req.body);
     res.json({"_message":result});
   }
   catch (e){
     res.json({"_message":e});
   }
})

app.listen(port, () => {
  console.log(`Example app listening on localhost:${port}`)
})