import { useEffect, useState } from 'react'
import { UserState } from 'Context/userContext'
import { useMachine } from '@xstate/react'
import DashboardMachine from 'Context/Machine/DashboardMachine'
import ModalNewTask from 'Components/ModalNewTask'
import IntlFecha from 'utils/IntlFecha'
import DetallesButton from 'Components/DetallesButton'
import shareLogo from 'assets/icon/comment-share.svg'

const Compartidos = () => {
  const [openModal, setOpenModal] = useState(false)
  const handledOpenModal = () => setOpenModal(!openModal)

  const [handleDetalle, sethandledDetalle] = useState(undefined)

  const { state } = UserState()
  const { user } = state.context

  const [current, send] = useMachine(DashboardMachine)
  useEffect(() => {
    if (user) send('GET_ALL_EVENTS', { data: user._id })
  }, [openModal])

  useEffect(() => {
    if (user) send('GET_ALL_EVENTS', { data: user._id })
  }, [handleDetalle])

  const { shareEvents } = current.context

  const DetalleMiniPanel = ({ fecha, share }) => {
    return (
      <div className="detalle__minipanel">
        <p>{ share.responsables ? <img src={shareLogo} className="img__minipanel"/> : null }</p>
        <small>{ <IntlFecha date={fecha} />}</small>
      </div>
    )
  }

  return (
    <div id="Dashboard">
      <div>
        <p>Tareas Asignadas</p>
        <span>
        </span>
      </div>
      <div>
        <p className="title__dashboard">Tareas activas</p>
        <ul className="lista__tareas">
          {
            current.matches('success') && (
              Object.values(shareEvents)
                .map(event => {
                  return (
                      <li key={event._id}>
                        <p>{event.subject}</p>
                        <DetalleMiniPanel
                          fecha={event.date}
                          share={event}
                        />
                        <DetallesButton
                          chivato={sethandledDetalle}
                          message={event.description}
                          subject={event.subject}
                          creador={event.creator}
                          responsables={event.responsables}
                          id={event._id}/>
                      </li>
                  )
                })
            )
          }
          {
            current.matches('success') && Object.values(shareEvents).length === 0 && <h1>¡No tienes tareas pendientes!</h1>
          }
        </ul>
      </div>
      <ModalNewTask open={openModal} handleCloseModal={handledOpenModal} />
    </div>
  )
}

export default Compartidos
