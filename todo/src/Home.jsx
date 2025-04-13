import React ,{useEffect, useState} from 'react'
import Create from './Create'
import './App.css'
import axios from 'axios'
import { BsCircleFill, BsTrashFill ,BsFillCheckCircleFill} from 'react-icons/bs'

function Home() {
    const [todos,setTodos] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3001/get")
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    },[])
    // const handleEdit = (e) => {
    //     const task = e.target.parentElement.children[1].innerText
    //     console.log(task)
    const handleEdit =(id) =>{
        axios.put("http://localhost:3001/update/"+id)
        .then(result => {
            location.reload( )
        })
        .catch(err => console.log(err))
    }
    const handleClick = (id) =>{
        axios.delete("http://localhost:3001/delete/"+id)
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }

    return (
        <>
    <div className='home'>
        <h2 className=''>TODO List </h2>
        <Create /> 
        {
            todos.length === 0 
            ? 
            <div><h2>No todos</h2></div> 
            :
            todos.map(todo => (
                <div className='task' key={todo._id}> 
                    <div className='checkbox' onClick={() =>handleEdit(todo._id)} >
                        {todo.done ?
                        <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                        :
                        <BsCircleFill className='icon' />
                        }
                       
                            <p className={todo.done ?"line_through":""}>{todo.task}</p>
                    </div>
                    <div>
                        <span><BsTrashFill className='icon' 
                        onClick={()=>{handleClick(todo._id)}} /></span>
                    </div>
                </div>
            ))
        }
    </div>
    </>
  )
}

export default Home