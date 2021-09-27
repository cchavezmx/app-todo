import { createMachine, assign } from 'xstate'

const getAllEventsById = async (ctx, event) => {
  const baseURL = process.env.REACT_APP_BASE_URL

  const addTask = await fetch(baseURL + `/events/${event.data}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res => res.message)
    .catch(err => console.log(err))

  console.log(addTask)

  return addTask
}

const getShareEvents = async (ctx, event) => {
  const baseURL = process.env.REACT_APP_BASE_URL
  const shareTask = await fetch(baseURL + `/sharetask/${ctx.curretID}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res => res.message)
    .catch(err => console.log(err))

  if (Object.values(shareTask).length > 0) {
    ctx.eventosCompartidos = true
  } else {
    ctx.eventosCompartidos = false
  }

  return shareTask
}

const getTerminadoEvents = async (ctx, event) => {
  const baseURL = process.env.REACT_APP_BASE_URL
  const shareTask = await fetch(baseURL + `/eventsterminados/${ctx.curretID}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res => res.message)
    .catch(err => console.log(err))

  return shareTask
}

const DashboardMachine = createMachine({
  id: 'newtask',
  initial: 'iddle',
  context: {
    events: [],
    shareEvents: [],
    terminados: [],
    curretID: undefined,
    eventosCompartidos: false
  },
  states: {
    iddle: {},
    error: {},
    success: {},
    getEvents: {
      invoke: {
        src: getAllEventsById,
        onDone: {
          target: 'getShareEvents',
          actions: assign({
            events: (ctx, event) => event.data
          })
        },
        onError: {
          target: 'error',
          actions: (ctx, evt) => console.log(evt)
        }
      }
    },
    getShareEvents: {
      invoke: {
        src: getShareEvents,
        onDone: {
          target: 'getTerminadoEvents',
          actions: assign({
            shareEvents: (ctx, event) => event.data
          })
        },
        onError: {
          target: 'error',
          actions: (ctx, evt) => console.log(evt)
        }
      }
    },
    getTerminadoEvents: {
      invoke: {
        src: getTerminadoEvents,
        onDone: {
          target: 'success',
          actions: assign({
            terminados: (ctx, event) => event.data
          })
        },
        onError: {
          target: 'error',
          actions: (ctx, evt) => console.log(evt)
        }
      }
    }
  },
  on: {
    GET_ALL_EVENTS: {
      target: 'getEvents',
      actions: (ctx, event) => {
        console.log(event)
        ctx.curretID = event.data
      }
    }
  }
})

export default DashboardMachine
