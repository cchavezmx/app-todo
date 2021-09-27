const IntlFecha = ({ date }) => {
  const eventdata = new Date(date)
  const intlfecha = Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' }).format(eventdata)
  return <h3>{ intlfecha }</h3>
}

export default IntlFecha
