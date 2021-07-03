import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Nav from './navbar'
import Signin from './navbar'

ReactDOM.render(
  <React.StrictMode>
    <Nav />
    <App />
    <Signin />
  </React.StrictMode>,
  document.getElementById('root')
)
