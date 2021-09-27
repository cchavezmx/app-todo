import React, { createContext, useContext, useEffect } from 'react'
import { useMachine } from '@xstate/react'
import { createMachine, assign } from 'xstate'
import { Redirect } from 'react-router'
import decode from 'jwt-decode'

const baseURL = process.env.REACT_APP_BASE_URL

export const UserStateContext = createContext()
export const UserDispatchContext = createContext()

// funciones para el loggin
const login = async (ctx, event) => {
  const response = await fetch(baseURL + '/user/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event.data)
  })
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.log(err))

  if (response) {
    localStorage.setItem('tokenUserSite', response.login.token)
  }
  return response
}

const auth = async () => {
  const token = localStorage.getItem('tokenUserSite')

  const auth = await fetch(baseURL + `/user/${decode(token).id}`, {
    method: 'get',
    headers: new Headers({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    })
  })
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.log(err))

  if (auth.message === 'authentication error') {
    throw new Error('Credenciales no validas')
  }

  return auth
}

const verifiToken = (ctx) => {
  const token = localStorage.getItem('tokenUserSite')
  if (!token) {
    ctx.token = undefined
  } else {
    ctx.token = token
  }
}

const register = async (ctx, event) => {
  // Nuevo usuario
  const register = await fetch(baseURL + '/user/register/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event.data)
  })
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.log(err))

  return register
}

const UserContextMachine = createMachine({
  id: 'userState',
  initial: 'initial',
  context: {
    user: undefined,
    error: undefined,
    token: undefined
  },
  states: {
    initial: {},
    login: {
      invoke: {
        id: 'login',
        src: login,
        onDone: {
          target: 'auth',
          actions: (ctx, event) => console.log(event)
        },
        onError: {
          actions: assign({
            error: (contex, event) => event.data
          }),
          target: 'error'
        }
      }
    },
    auth: {
      always: [
        {
          target: 'validate',
          actions: 'verifiToken',
          cond: (ctx) => ctx?.token !== null
        },
        {
          target: 'error'
        }
      ]
    },
    validate: {
      invoke: {
        src: auth,
        onDone: {
          target: 'success',
          actions: assign({
            user: (ctx, event) => event.data
          })
        },
        onError: {
          target: 'error',
          actions: assign({
            error: (ctx, event) => event.data
          })
        }
      }
    },
    error: {},
    success: {},
    logout: {
      invoke: {
        src: async (ctx) => {
          localStorage.removeItem('tokenUserSite')
          ctx.user = undefined
        },
        onDone: {
          target: 'initial'
        }
      }
    },
    register: {
      invoke: {
        src: register,
        onDone: {
          target: 'register_done'
        }
      }
    },
    register_done: {}

  },
  on: {

    VALIDATE: [
      {
        target: 'validate',
        cond: (ctx) => ctx.user === undefined
      },
      {
        target: 'auth'
      }
    ],

    LOGIN: 'login',
    LOGOUT: 'logout',
    REGISTRO: 'register'
  }
},
{
  actions: {
    verifiToken: verifiToken
  }
}
)

export const UserContextProvider = ({ children }) => {
  const [state, dispatch, service] = useMachine(UserContextMachine)

  useEffect(() => {
    dispatch('VALIDATE')
  }, [])

  useEffect(() => {
    if (state.matches('error')) {
      dispatch('LOGOUT')
    }
  })

  useEffect(() => {
    if (!state.context.user) {
      return <Redirect to="/login"></Redirect>
    }
  }, [state.context.user])

  return (
    <UserStateContext.Provider value={{ state, service }}>
      <UserDispatchContext.Provider value={dispatch}>
        { children }
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

export const UserState = () => useContext(UserStateContext)
export const UserDispatch = () => useContext(UserDispatchContext)
