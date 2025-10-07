import dotenv from 'dotenv'
import express from "express"

import cors from "cors"
dotenv.config()

const app = express()
app.use(cors())  
app.use(express.json())

const port = process.env.PORT || 4000;

app.get('/h', (req, res) => {
  
  res.json({ "hello": "world" })
})

app.post('/data',(req,res)=>{
    console.log(req.body) ;
    
    res.json({"_message":"data recived"});
})

app.listen(port, () => {
  console.log(`Example app listening on localhost:${port}`)
})