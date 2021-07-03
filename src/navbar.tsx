import React, { useState } from 'react'
import logo from './logo.svg'
import './styles/style.css'
import './styles/navbar.css'

function navbar() {
    const [count, setCount] = useState(0)

    return (
        <nav className="navbar">Wyvren</nav>
    )
}

export default navbar
