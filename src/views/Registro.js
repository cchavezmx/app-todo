import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { UserState, UserDispatch } from 'Context/userContext'
import { useForm } from 'react-hook-form'
import ErrorModal from 'Components/ErrorModal'

const Registro = () => {
  // metodos del userContext
  const { state } = UserState()
  const dispatch = UserDispatch()

  const [openModal, setModal] = useState(false)
  const handleCloseModal = () => setModal(!openModal)
  const [message, setMessage] = useState([])
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    if (data.confirmPassword !== data.password) {
      setMessage('La contraseñas no coinciden')
      handleCloseModal()
    } else {
      dispatch('REGISTRO', { data })
    }
  }

  const { user } = state.context

  return (
    <div id="Login">
      <section>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Registro</h1>
            <input
              type="email"
              id="email"
              placeholder="Correo Electronico"
              {...register('email', { required: true })}
              />
            {errors.email && <span>Este campo es requerido</span>}
            <input
              type="text"
              id="name"
              placeholder="Nombre Completo"
              {...register('name', { required: true })}
              />
            {errors.name && <span>Este campo es requerido</span>}
            <input
              placeholder="Contraseña"
              type="password"
              id="password"
              {...register('password', { required: true })}
              />
            {errors.password && <span>Este campo es requerido</span>}
            <input
              placeholder="Repite tu Contraseña"
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', { required: true })}
              />
            {errors.password && <span>Este campo es requerido</span>}
            <button>Entrar</button>
            <section>
            </section>
          </form>

        </div>
        <div className="laimagen" />
      </section>
      { user && <Redirect to="/dashboard"/>}
      { state.matches('register_done') && <Redirect to="/login"/>}
      { openModal && <ErrorModal message={message} open={openModal} handleCloseModal={handleCloseModal} /> }
    </div>
  )
}
export default Registro
