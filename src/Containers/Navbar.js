import { Link, useLocation } from 'react-router-dom'
import { UserDispatch } from 'Context/userContext'

const Navbar = (props) => {
  const params = useLocation()
  const currentParam = params.pathname

  const dispatch = UserDispatch()

  const logout = () => {
    dispatch('LOGOUT')
  }

  return (
    <nav id="Navbar">
      <Link to="/dashboard">
        <span className={ currentParam === '/dashboard' ? 'btn_home btn__selectd' : 'btn_home' }></span>
      </Link>
      <div style={{ marginTop: '10px' }}></div>
      <Link to="/compartidos">
        <span className={ currentParam === '/compartidos' ? 'btn_share btn__selectd' : 'btn_share' }>Share</span>
      </Link>
      <Link to="/terminados">
        <span className={ currentParam === '/terminados' ? 'btn_terminadas btn__selectd' : 'btn_terminadas' }>Share</span>
      </Link>

        <span className="btn_logout" onClick={() => logout()}></span>

    </nav>
  )
}
export default Navbar
