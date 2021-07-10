import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Nav from './navbar'
import Signin from './components/signin'

import './styles/bootstrap-min.css'

ReactDOM.render(
  <React.StrictMode>
    <Nav />
    <Signin />
  </React.StrictMode>,
  document.getElementById('root')
)
