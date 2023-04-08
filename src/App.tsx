import { useCallback, useReducer } from 'react'

import { Task } from './app.type'
import { reducer } from './app.reducer'

import Items from './components'

import './App.css'

function filterByType(list: Task[], ...types: Task['state'][]) {
  return list.filter((item) => types.includes(item.state))
}

function App() {
  const [tasks, dispatch] = useReducer(reducer, [])

  const handleAdd = useCallback(() => {
    const description = prompt('Describe the new task')
    description && dispatch({ type: 'add', payload: description })
  }, [])

  const handleDelete = useCallback((id: string) => {
    dispatch({ type: 'remove', payload: id })
  }, [])

  const handleGoForwards = useCallback((id: string) => {
    dispatch({ type: 'go-fowards', payload: id })
  }, [])

  const handleGoBackwards = useCallback((id: string) => {
    dispatch({ type: 'go-backward', payload: id })
  }, [])

  return (
    <>
      <button onClick={handleAdd}>Add Task</button>
      <div className='Kanban'>
        <div className='Column'>
          <h2>To Do</h2>
          {filterByType(tasks, 'to-do', 'removed').map((todo) => (
            <Items.ToDoItem
              key={todo.id}
              {...todo}
              onGoForwards={handleGoForwards}
              onRemove={handleDelete}
            />
          ))}
        </div>
        <div className='Column'>
          <h2>Doing</h2>
          {filterByType(tasks, 'doing').map((doing) => (
            <Items.DoingItem
              key={doing.id}
              {...doing}
              onGoForwards={handleGoForwards}
              onGoBackwards={handleGoBackwards}
            />
          ))}
        </div>
        <div className='Column'>
          <h2>Done</h2>
          {filterByType(tasks, 'done').map((done) => (
            <Items.DoneItem
              key={done.id}
              {...done}
              onGoBackwards={handleGoBackwards}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
