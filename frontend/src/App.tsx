import React, { useEffect, useState } from 'react'
import Input from './components/Input';
import axios from 'axios';
import type { Todo } from './components/model';
import Listing from './components/list';
const App:React.FC=()=>{
const [input,setInput]=useState<string >("");
const [tasks,setTasks]=useState<Todo[]>([]);
const [comTask,setComtask]=useState<Todo[]>([]); 

const heandel=async(e:React.FormEvent)=>{
       e.preventDefault();
       if(input){
        const now = new Date();
        const dateOnly = now.toISOString().split("T")[0];
        const res=await axios.post("http://localhost:3000/data",
         {id:Date.now(),task:input,isDone:false,date:String(dateOnly)}
         );
         console.log(res)
        setTasks([...tasks,{id:Date.now(),task:input,isDone:false,date:String(dateOnly)}]);
        setInput("")
        console.log(tasks[0])
       }
}

// useEffect(()=>{
//   (async()=>{
//     const res=await axios.post("http://localhost:3000/data",{
//      data:tasks

//     })
//     console.log(res)

//   })()
// },[tasks]);


  return (
    <div className="App">
      <h1 className="heading">TO DO</h1>
      <Input todo={input} setTodo={setInput} heandel={heandel}></Input>
      <Listing arr={tasks} comarr={comTask} arrTask={setTasks}  setComarr={setComtask}></Listing>

    </div>
  );
}
export default App
