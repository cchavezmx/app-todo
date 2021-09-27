import { Modal } from 'antd'

const ErrorModal = ({ message, open, handleCloseModal }) => {
  return (
    <Modal
      centered
      visible={open}
      onCancel={handleCloseModal}
      footer={null}
    >
      <span className="modal__error">
        { message }
      </span>
    </Modal>
  )
}

export default ErrorModal
