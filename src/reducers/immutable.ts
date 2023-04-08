import { v4 as uuid } from 'uuid'
import { produce } from 'immer'

import { Action, State } from '../interfaces'

export const reducer = (tasks: State, action: Action): State => {
  switch (action.type) {
    case 'add':
      return produce(tasks, (draft) => {
        draft.push({
          id: uuid(),
          description: action.payload,
          state: 'to-do',
        })
      })
    case 'remove':
      return produce(tasks, (draft) => {
        draft.find((task => task.id === action.payload))!.state = 'removed'
      })
    case 'go-fowards':
      return produce(tasks, (draft) => {
        const current = draft.find((task => task.id === action.payload))!
        current.state = current?.state === 'to-do' ? 'doing' : 'done'
      })
    case 'go-backward':
      return produce(tasks, (draft) => {
        const current = draft.find((task => task.id === action.payload))!
        current.state = current?.state === 'done' ? 'doing' : 'to-do'
      })
    default:
      return tasks
  }
}