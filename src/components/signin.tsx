import React, { useState } from 'react'
import './styles/style.css'
import './styles/signin.css'

function signin() {
    
    let a = 0
    return (
        <div className="app">
            <button onClick={() => a + 1}>
                {a}
            </button>
        </div>
    )
}

export default signin