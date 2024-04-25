import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {

  //초기값을 저장소에서 불러오기.
  const [todolist, setTodolist] =useState(
    () => {
      const Browservalue = localStorage.getItem("TASKS")
      if (Browservalue == null) return []
      return JSON.parse(Browservalue);
    }
  );

  const deleteItem = (id) => {

    const conform = todolist.find(item => item.id == id)
    console.log('conform', conform);

    if (conform.completed == false) return
    else{
      //setTodolist id가 받아온 id피해서 필터링
      setTodolist(currentlist => {
        return currentlist.filter(item => item.id !== id)
      })
    }  
  }

  const toggleItem = (id, completed) => {

    //id가 해당되는 놈만 받아온 컴플리트로 변경하면 됨.
    setTodolist(

      prevTodo => {
        return prevTodo.map(item => {
          if(item.id == id)
          {
            return{...item, completed}
          }
          return item
        })
      }
    )
  }

  [
    {id: 1, Task: "구독하기", completed: false}
  ]
  
  useEffect( () => {
    //todolist가 변경될때 마다 이작업 해주세요. (UseEffect)
    localStorage.setItem("TASKS", JSON.stringify(todolist))
  } , [todolist] )

  const ref = useRef()

  const addItm = (e) => {

    e.preventDefault()

    //생성시에 특수한 고유의 ID를 부여해보자.

    setTodolist([...todolist, {id:crypto.randomUUID(), Task: ref.current.value, completed: false} ])

    console.log (todolist);
    ref.current.value = null;

  }
  
  return (
    <>
    <h1>ToDoList</h1>
    <form onSubmit={addItm}>

      <input ref={ref}/>

      <button>Add Task</button>

    </form>

    <hr/>

    <ul className="list">
      {
      todolist.map(item => (<li key={item.id}>
        <label>
          <input
          type="checkbox"
          onChange={e => toggleItem(item.id, e.target.checked)}
          />
        {item.Task}
        </label>
        <button className="btn btn-danger" onClick={ e=> deleteItem(item.id)}>Delete</button>
        </li>))
      }
    </ul>
    </>
  )
}

export default App
