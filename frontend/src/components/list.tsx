import React, { useEffect, useState } from "react";
import type { Todo } from "./model";
interface props{
    arr:Todo[];
    comarr:Todo[];
    arrTask:React.Dispatch<React.SetStateAction<Todo[]>>;
    setComarr:React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Listing=({arr,comarr, arrTask,setComarr}:props)=>{
const [Idx,setIdx]=useState<number>(-1);
const [getId,setId]=useState<number>(0);


useEffect(()=>{
if (Idx < 0) return;
const date=arr[Idx].date;
const id=arr[Idx].id;
const task=arr[Idx].task;
const isDone=true;
setComarr([...comarr,{date:date,id:id,task:task,isDone:isDone}]);
arrTask(prev=>prev.filter((ele,idx)=>ele.id!==getId))



},[Idx]);



    return (<>
    <div>Taks not completed:</div>
    <ol>
        {arr.map((val,idx)=>
        ( <li key={idx}>
            <div style={{display:"flex",justifyContent:"flex-start",}}>
           <div>{val.task}</div>
           <div>{val.date}</div>
           <div>{(val.isDone)?"done":<button onClick={()=>{
            setIdx(idx);
            setId(val.id);
           }}>X</button>}</div>

           </div>
        </li>)
        )}
    </ol>
    <div>Task completed :</div>
     <ol>
        {comarr&&comarr.map((val,idx)=>
        ( <li key={idx}>
            <div style={{display:"flex",justifyContent:"flex-start",}}>
           <div>{val.task}</div>
           <div>{val.date}</div>
           <div>{(val.isDone)?"done":<button>X</button>}</div>

           </div>
        </li>)
        )}
    </ol>
    </>)
}

export default Listing;