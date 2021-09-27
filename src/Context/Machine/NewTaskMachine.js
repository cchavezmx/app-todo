import { createMachine } from 'xstate'

const addNewTask = async (ctx, event) => {
  const baseURL = process.env.REACT_APP_BASE_URL

  const addTask = await fetch(baseURL + '/insert/event', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event.data)
  })
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.log(err))

  return addTask
}

const NewTaskMachine = createMachine({
  id: 'newtask',
  initial: 'iddle',
  context: {
    alluserSelect: []
  },
  states: {
    iddle: {},
    error: {},
    success: {},
    newTask: {
      invoke: {
        src: addNewTask,
        onDone: {
          target: 'success',
          actions: (ctx, evt) => console.log(evt)
        },
        onError: {
          target: 'error',
          actions: (ctx, evt) => console.log(evt)
        }
      }
    }
  },
  on: {
    NEW_TASK: 'newTask'
  }
})

export default NewTaskMachine
