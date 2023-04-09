import { reducer } from './with-immer'

import { State } from '../interfaces'

describe('reducers test', () => {
  test('should add a new task', () => {
    const innital: State = []
    const state = reducer(innital, { type: 'add', payload: 'first test' })

    expect(innital).toHaveLength(0)
    expect(state).toHaveLength(1)
  })

  test('should remove an existing task', () => {
    const innital: State = [
      { id: '1', description: 'One', state: 'to-do' },
      { id: '2', description: 'Two', state: 'done' },
    ]

    const state = reducer(innital, { type: 'remove', payload: '1' })
    expect(state[ 0 ].state).toBe('removed')
  })

  test('should move forwards the task', () => {
    const innital: State = [
      { id: '1', description: 'One', state: 'to-do' },
      { id: '2', description: 'Two', state: 'done' },
    ]
    const state = reducer(innital, { type: 'go-fowards', payload: '1' })
    expect(state[ 0 ].state).toBe('doing')
    expect(state[ 1 ]).toBe(innital[ 1 ])
  })

  test('should move backwards the task', () => {
    const innital: State = [
      { id: '1', description: 'One', state: 'to-do' },
      { id: '2', description: 'Two', state: 'done' },
    ]
    const state = reducer(innital, { type: 'go-backwards', payload: '2' })
    expect(state[ 1 ].state).toBe('doing')
    expect(state[ 0 ]).toBe(innital[ 0 ])
  })
})