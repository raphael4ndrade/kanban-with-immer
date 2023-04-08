import { reducer } from './mutable'

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
    expect(state).toHaveLength(2)
    expect(state[0]).toStrictEqual({ ...innital[0], state: 'removed' })
    expect(state).not.toBe(innital)
  })
})