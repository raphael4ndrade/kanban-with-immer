import { memo } from 'react'
import { ArrowLeft, ArrowRight, Add, Remove } from '../assets'
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
  onAdd: (id: string) => void
}

type ToDoProps = DefaultProps & Omit<Functions, 'onGoBackwards'>
type DoingProps = DefaultProps & Omit<Functions, 'onRemove' | 'onAdd'>
type DoneProps = DefaultProps &
  Omit<Functions, 'onGoForwards' | 'onRemove' | 'onAdd'>

const ToDoItem = (props: ToDoProps) => {
  const hasBeenRemoved = props.state === 'removed'

  return (
    <div className={`item ${hasBeenRemoved ? 'removed' : ''}`}>
      <p>{props.description}</p>
      {hasBeenRemoved ? (
        <div className='actions'>
          <button onClick={() => props.onAdd(props.id)}>
            <Add />
          </button>
        </div>
      ) : (
        <div className='actions'>
          <button onClick={() => props.onGoForwards(props.id)}>
            <ArrowRight />
          </button>
          <button onClick={() => props.onRemove(props.id)}>
            <Remove />
          </button>
        </div>
      )}
    </div>
  )
}

const DoingItem = (props: DoingProps) => (
  <div className='item'>
    <p>{props.description}</p>
    <div className='actions'>
      <button onClick={() => props.onGoForwards(props.id)}>
        <ArrowRight />
      </button>
      <button onClick={() => props.onGoBackwards(props.id)}>
        <ArrowLeft />
      </button>
    </div>
  </div>
)

const DoneItem = (props: DoneProps) => (
  <div className='item'>
    <p>{props.description}</p>
    <div className='actions'>
      <button onClick={() => props.onGoBackwards(props.id)}>
        <ArrowLeft />
      </button>
    </div>
  </div>
)

export default {
  ToDoItem: memo(ToDoItem),
  DoingItem: memo(DoingItem),
  DoneItem: memo(DoneItem),
}
