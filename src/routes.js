import React from 'react'

const Dashboard = React.lazy(() => import('views/Dashboard'))
const Compartidos = React.lazy(() => import('views/Compartidos'))
const Terminadas = React.lazy(() => import('views/Terminadas'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/compartidos', name: 'Dashboard', component: Compartidos },
  { path: '/terminados', name: 'Dashboard', component: Terminadas }

]
export default routes
