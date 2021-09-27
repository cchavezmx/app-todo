const BuscadorMini = ({ children, dataSet } = {}) => {
  return (
        <>
        { children }
            <datalist id="familiaList">
            { Array.isArray(dataSet) && dataSet.payload && Object.entries(dataSet).map(([key, val]) => {
              return val?.payload.map(({ familia }) => {
                return (
                        <option key={key + familia }>
                            { familia }
                        </option>
                )
              })
            })}
            </datalist>
        </>
  )
}

export default BuscadorMini
