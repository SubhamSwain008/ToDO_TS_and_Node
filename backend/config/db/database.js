import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
dotenv.config()
const uri=process.env.MONGO_URI

async function db_connect() {

    try{
      const client=new MongoClient(uri);
      const res=await client.connect();
      console.log("db connected",res);
      
      return client;
    }
    catch(e){
        console.log(e);
        

    }
    
}

export default db_connect