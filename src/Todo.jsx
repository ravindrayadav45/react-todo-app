import { IoIosCloudDone } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";




export default function Todo(){
  const todoskey = "reactTodos"
  const [formvalue , setFormValue] = useState({Task:""})
  const [task , setTask]=useState(() => {
    const rawTodos = localStorage.getItem(todoskey);
     if(!rawTodos) return [];
    return JSON.parse(rawTodos)
  })

  const [dateTime , setdateTime] = useState("")
 
  //get current form input value 
  function handleChange(e){
  const  {name , value} = e.target
  setFormValue({...formvalue,[name]:value,

  });

  }
  
  //submit task from input box 
  function handlerSubmit(e){
    e.preventDefault()
    if(formvalue.Task.trim() === "")
      return;

    if(task.some(item => item.text === formvalue.Task)){
      alert("This task already exist")
      setFormValue({Task:""})
      return 
    } 
    setTask(prevtask => [...prevtask,{text:formvalue.Task, completed:false,}])
    setFormValue({Task:""})
  }

  //TODO Date and Time 
  useEffect(() =>{
  const interval = setInterval(() =>{
  const now = new Date()
  const formttedDate = now.toLocaleDateString()
  const formttedTime = now.toLocaleTimeString()
  setdateTime(`${formttedDate} - ${formttedTime}`)
 },1000)

 return () => clearInterval(interval);

 },[])

 //Delete items 
 function deleteHandler(index){
  const updatedTask = task.filter((element,id) => id !== index)
  setTask(updatedTask)
 }


 //Line through functionlity here 
 const toggleTask = (index) => {
  setTask(
    task.map((item, i) =>
      i === index
        ? { ...item, completed:!item.completed }
        : item
    )
  );
};


//Save item in local storage
localStorage.setItem(todoskey,JSON.stringify(task))
  


  return(
    <>
    <div className="flex flex-col pt-20 items-center w-full h-screen  bg-[#0F172A] text-[#F8FAFC] px-2">
      <div>
      
      </div>
      
        <h1 className="text-4xl font-bold text-center">Todo App</h1>
        <h2 className="text-xl  text-center mt-4 font-bold">{dateTime}</h2>



        <form onSubmit={handlerSubmit} className="p-5">
          <input type="text" placeholder="Enter Task " autoFocus className="w-100 border-none outline-none px-7 py-4 text-black rounded-tl rounded-bl" autoComplete="off" name="Task" onChange={handleChange} value={formvalue.Task} />
          <button className="bg-[#0b5879] py-4 px-2 rounded-tr rounded-br  hover:bg-blue-700" type="submit">Add Task</button>
        </form>


         {
          task.map((item , index )=>(
            
        <div key={index} className="bg-slate-800 w-full md:w-80 p-4 flex justify-between  mt-4">
         <p className={`text-3 text-white ${item.completed ? "line-through opacity-50" : ""}`}>{item.text}</p>
         <div className="flex gap-4">
         <button className="text-green-500 text-3xl" onClick={()=> toggleTask(index)}><IoIosCloudDone /></button>
         <button className="text-red-700 text-3xl" onClick={()=> deleteHandler(index)}><MdDeleteForever /></button>
         </div>
        </div>

          ))
         }
        
        <button onClick={()=>setTask([])} className="bg-red-700 px-4 rounded py-2 flex justify-self-center mt-4 hover:bg-red-900">Clear All</button>


        <h2 className="relative top-80">Made with ❤️ by Ravindra Yadav</h2>
      
    </div>
    </>
  )
}