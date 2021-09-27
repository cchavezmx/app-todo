import { useCallback, useEffect, useState } from 'react'

import { Modal } from 'antd'
import NewTaskMachine from 'Context/Machine/NewTaskMachine'

import { useForm } from 'react-hook-form'
import { UserState } from 'Context/userContext'
import { useMachine } from '@xstate/react'

import FetchHook from 'Context/FetchHook'

const ModalNewTask = ({ open, handleCloseModal }) => {
  const [current, send] = useMachine(NewTaskMachine)
  const { state } = UserState()
  const { handleSubmit, register, reset, formState: { errors } } = useForm()

  const { user } = state.context

  const hoy = new Date(Date.now())
  const month = hoy.getMonth() < 10 ? `0${hoy.getMonth() + 1}` : hoy.getMonth()
  const day = hoy.getDate()
  const year = hoy.getFullYear()
  const [tareaDate, setTareaDate] = useState(`${year}-${month}-${day}`)

  const onSubmit = (data) => {
    const payload = {
      subject: data.subject,
      description: data.description,
      responsables: data.responsables === 'Compartir tarea' ? null : data.responsables,
      date: data.date,
      creator: user._id
    }
    send('NEW_TASK', { data: payload })
  }

  const [userList, setUserList] = useState([])
  const allUserSelector = useCallback(async () => {
    await FetchHook({
      url: '/alluser/',
      metohd: 'get'
    })
      .then(res => setUserList(res.message))
  }, [])

  useEffect(() => {
    allUserSelector()
  }, [])

  useEffect(() => {
    if (current.matches('success')) {
      reset()
      handleCloseModal()
    }
  }, [current])

  return (
    <Modal
      title="Añade o comparte una nueva tarea"
      centered
      visible={open}
      onCancel={handleCloseModal}
      footer={null}
    >
      {JSON.stringify(current.value)}
      <form className="newTaskForm" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Asunto"
          id="subject"
          {...register('subject', { required: true })}
        />
        { errors.asunto && <p>Este campo es obligatorio</p> }
        <textarea
          type="text"
          placeholder="Descripción"
          id="description"
          {...register('description', { required: true })}
        />
        { errors.description && <p>Este campo es obligatorio</p> }
        <span>
          <select
            type="search"
            id="responsables"
            list="responsables"
            {...register('responsables')}
          >
            {
              Object.values(userList)
                .map((user, index) => {
                  return (
                    <option key={index} value={user._id}>{user.name}</option>
                  )
                })
            }
          </select>
        </span>

      <span className="datePicker">
        <p>Día de la tarea</p>
        <input
          {...register('date')}
          value={tareaDate}
          onChange={(e) => setTareaDate(e.target.value)}
          type="date" />
      </span>
        <button>Añadir tarea</button>
      </form>
    </Modal>
  )
}

export default ModalNewTask
