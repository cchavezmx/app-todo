import React, { createContext, useContext, useState } from 'react'

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false)
  const handledModal = () => setOpenModal(!openModal)
  return (
    <AppContext.Provider value={{
      openModal, handledModal
    }}>
        { children }
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
