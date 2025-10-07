import React, { useRef } from "react"
interface props{
    todo:string ;
    setTodo:React.Dispatch<React.SetStateAction<string>>;
    heandel:(e:React.FormEvent)=>void;
}

const Input=({todo,setTodo,heandel}:props)=>{
const inputref=useRef<HTMLInputElement>(null)
    
    return(<div>

       <form onSubmit={(e)=>{
        heandel(e);
        inputref.current?.blur();
        
        }} className="input">
        <input type="text" placeholder="enter task" ref={inputref} value={todo} onChange={(e)=>setTodo(e.target.value)}/>
        <button type="submit">add task</button>
       </form>
    </div>
    )

}

export default Input