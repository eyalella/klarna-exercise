export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'

function addTodo (todo) {
  return {type: ADD_TODO, todo}
}

function removeTodo (id) {
  return {type: REMOVE_TODO, id}
}

function toggleTodo (id) {
  return {type: TOGGLE_TODO, id}
}

const ACTION_HANDLERS = {
  [ADD_TODO]: (state, action) => [...state.todos, action.todo],
  [REMOVE_TODO]: (state, action) => state.todos.filter(todo => action.id === todo.id),
  [TOGGLE_TODO]: (state, action) => state.todos.map(todo => {
    if (action.id === todo.id) {
      todo.done = !todo.done
    }
    return todo
  })
}

export const actions = {addTodo, removeTodo, toggleTodo}

export default function todosReducer (state = [], action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
