import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Nav from './navbar'
import Signin from './components/signinnew'
import { authLogs } from './components/signin'
import Socketio from './components/socketio'

console.log(authLogs.isSignedIn?.isSignedIn);
var signin
if (authLogs.isSignedIn?.isSignedIn != true) {
  signin = <Signin />
}

import './styles/bootstrap-min.css'

ReactDOM.render(
  <React.StrictMode>
    <Nav />
    {signin}
    <Socketio />
  </React.StrictMode>,
  document.getElementById('root')
  )