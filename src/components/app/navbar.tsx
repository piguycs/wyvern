import React from "react"
import branding from '../../assets/branding.svg'

import '../../styles/app/navbar.scss'

function navbar() {
    return (
        <nav className="nav">
            <img className="branding" src={branding} alt="branding" />
            <div className="nav-div">
                Navbar                
            </div>
        </nav>
    )
}

export default navbar