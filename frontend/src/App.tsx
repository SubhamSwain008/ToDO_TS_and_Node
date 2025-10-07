import React, { useEffect, useState } from 'react'
import Input from './components/Input';

import type { Todo } from './components/model';
import Listing from './components/list';
const App:React.FC=()=>{
const [input,setInput]=useState<string >("");
const [tasks,setTasks]=useState<Todo[]>([]);
const [comTask,setComtask]=useState<Todo[]>([]); 

const heandel=(e:React.FormEvent)=>{
       e.preventDefault();
       if(input){
        const now = new Date();
        const dateOnly = now.toISOString().split("T")[0];
        setTasks([...tasks,{id:Date.now(),task:input,isDone:false,date:String(dateOnly)}]);
        setInput("")
        console.log(tasks[0])
       }
}

  return (
    <div className="App">
      <h1 className="heading">TO DO</h1>
      <Input todo={input} setTodo={setInput} heandel={heandel}></Input>
      <Listing arr={tasks} comarr={comTask} arrTask={setTasks}  setComarr={setComtask}></Listing>

    </div>
  );
}
export default App
