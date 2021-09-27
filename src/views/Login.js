import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserState, UserDispatch } from 'Context/userContext'
import { Redirect } from 'react-router'
import ErrorModal from 'Components/ErrorModal'

const Login = () => {
  const { state } = UserState()
  const dispatch = UserDispatch()

  const [openModal, setModal] = useState(false)
  const handleCloseModal = () => setModal(!openModal)
  const [message, setMessage] = useState([])

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    dispatch('LOGIN', { data })
  }

  const { user } = state.context

  useEffect(() => {
    if (state.matches('error')) {
      handleCloseModal()
      setMessage('Error en la contraseña o email')
    }
  }, [state])

  return (
    <div id="Login">
      <section>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Inicio de sesión</h1>
            <input
              type="email"
              id="email"
              placeholder="Correo Electronico"
              {...register('email', { required: true })}
              />
            {errors.email && <span>This field is required</span>}
            <input
              placeholder="Contraseña"
              type="password"
              id="password"
              {...register('password', { required: true })}
              />
            {errors.password && <span>This field is required</span>}
            <button>Entrar</button>
            <section>
              <a href="/registro"><span>Registar</span></a>
              <a><span>¿Olvidate tu contraseña?</span></a>
            </section>
          </form>

        </div>
        <div className="laimagen" />
      </section>
      { user && <Redirect to="/dashboard"/>}
      { openModal && <ErrorModal message={message} open={openModal} handleCloseModal={handleCloseModal} /> }
    </div>
  )
}
export default Login
