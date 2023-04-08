import { v4 as uuid } from 'uuid'

import { Action, State } from './app.type'

export const reducer = (tasks: State, action: Action): State => {
  switch (action.type) {
    case 'add':
      return [
        ...tasks,
        {
          id: uuid(),
          description: action.payload,
          state: 'to-do',
        },
      ]
    case 'remove':
      return tasks.map((task) => {
        if (task.id === action.payload) {
          task.state = 'removed'
        }
        return task
      })
    case 'go-fowards':
      return tasks.map((task) => {
        if (task.id === action.payload) {
          task.state = task.state === 'to-do' ? 'doing' : 'done'
        }
        return task
      })
    case 'go-backward':
      return tasks.map((task) => {
        if (task.id === action.payload) {
          task.state = task.state === 'done' ? 'doing' : 'to-do'
        }

        return task
      })
    default:
      return tasks
  }
}