import { useState } from 'react'
import { Modal } from 'antd'
import NombreUserHook from './NombreUserHook'

const baseURL = process.env.REACT_APP_BASE_URL

const DetallesButton = ({ message, subject, id, chivato, responsables, creador }) => {
  const [messageState, setMessageState] = useState(message)
  const [subjectState, setSubjectState] = useState(subject)
  const [openModal, setOpenModal] = useState(false)
  const handledModal = () => setOpenModal(!openModal)

  const modificarNota = async () => {
    const payload = {
      subject: subjectState,
      description: messageState
    }
    const newNota = await fetch(baseURL + `/updatenota/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
      .finally(() => handledModal())
      .finally(() => chivato(payload))

    return newNota
  }

  const [validateAcction, setValidateAcction] = useState(false)
  const modalValidar = () => setValidateAcction(!validateAcction)
  const handledBorarNota = () => {
    modalValidar()
    borrarNota()
  }
  const borrarNota = async () => {
    const desactiveNota = await fetch(baseURL + `/cancelarevento/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
      .finally(() => handledModal())
      .finally(() => chivato({ clean: id }))

    return desactiveNota
  }

  return (
    <>
    <Modal
      centered
      visible={openModal}
      onCancel={handledModal}
      footer={
        <div className="modal__evento__container">
          <button className="btn__cancelar__evento" onClick={() => modalValidar()}>Terminar Tarea</button>
          <button className="btn__modificar__evento" onClick={() => modificarNota()}>Modificar</button>
        </div>
      }
    >
      <div className="modal__detalles">
      <label>Asunto</label>
      <input
          className="input__modal"
          value={subjectState}
          onChange={(e) => setSubjectState(e.target.value)}
        />
        <label>Descripción</label>
        <textarea
          className="textarea__modal"
          value={messageState}
          onChange={(e) => setMessageState(e.target.value)}
        />
      </div>
    <span className="detalle__responsables">
      <span>Responsable: <NombreUserHook id={responsables} /></span>
      <span>Creado: { creador ? <NombreUserHook id={creador}/> : 'Yo '}</span>
    </span>
    </Modal>
      <a onClick={() => handledModal()}>Detalles</a>

    <Modal
      centered
      visible={validateAcction}
      onCancel={modalValidar}
      footer={null}
      >
      <div className="modal__validate">
        <p>¿Esta Seguro?</p>
        <button className="btn__validate__evento" onClick={() => handledBorarNota()}>Terminar Tarea</button>
      </div>
    </Modal>
    </>
  )
}

export default DetallesButton
