import { useCallback, useEffect, useState } from 'react'
import FetchHook from 'Context/FetchHook'

const NombreUserHook = ({ id }) => {
  const [userName, setUserName] = useState([])
  const allUserSelector = useCallback(async () => {
    await FetchHook({
      url: `/getoneuser/${id}`,
      metohd: 'get'
    })
      .then(res => setUserName(res.message))
  }, [])

  useEffect(() => {
    allUserSelector()
  }, [])

  return (
    Array.isArray(userName) ? <small>{userName[0]?.name}</small> : null
  )
}

export default NombreUserHook
