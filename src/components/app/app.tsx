import React from "react"

import Chat from "./chat"
import Navbar from "./navbar"

// CSS
import '../../styles/app/app.scss'

// Props
interface props {
    
}

function app(props: props) {

    return (
        <div className="app">
            <Navbar />
            <Chat />
        </div>
    )
}

export default app