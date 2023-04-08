export type Action =
  | { type: 'add'; payload: string }
  | { type: 'remove'; payload: string }
  | { type: 'go-fowards'; payload: string }
  | { type: 'go-backward'; payload: string }

export type Task = {
  id: string
  description: string
  state: 'to-do' | 'doing' | 'done' | 'removed'
}

export type State = Task[]