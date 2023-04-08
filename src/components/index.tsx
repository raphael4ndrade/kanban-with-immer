import { memo } from 'react'
import './components.css'

type DefaultProps = {
  id: string
  description: string
  state: 'to-do' | 'doing' | 'done' | 'removed'
}

type Functions = {
  onGoForwards: (id: string) => void
  onGoBackwards: (id: string) => void
  onRemove: (id: string) => void
}

type ToDoProps = DefaultProps & Omit<Functions, 'onGoBackwards'>
type DoingProps = DefaultProps & Omit<Functions, 'onRemove'>
type DoneProps = DefaultProps & Omit<Functions, 'onGoForwards' | 'onRemove'>

const ToDoItem = (props: ToDoProps) => {
  const hasBeenRemoved = props.state === 'removed'

  return (
    <div className={`item ${hasBeenRemoved ? 'removed' : ''}`}>
      <p>{props.description}</p>
      {!hasBeenRemoved && (
        <div className='actions'>
          <button onClick={() => props.onGoForwards(props.id)}>{'->'}</button>
          <button onClick={() => props.onRemove(props.id)}>x</button>
        </div>
      )}
    </div>
  )
}

const DoingItem = (props: DoingProps) => (
  <div className='item'>
    <p>{props.description}</p>
    <div className='actions'>
      <button onClick={() => props.onGoForwards(props.id)}>{'->'}</button>
      <button onClick={() => props.onGoBackwards(props.id)}>{'<-'}</button>
    </div>
  </div>
)

const DoneItem = (props: DoneProps) => (
  <div className='item'>
    <p>{props.description}</p>
    <div className='actions'>
      <button onClick={() => props.onGoBackwards(props.id)}>{'<-'}</button>
    </div>
  </div>
)

export default {
  ToDoItem: memo(ToDoItem),
  DoingItem: memo(DoingItem),
  DoneItem: memo(DoneItem),
}
