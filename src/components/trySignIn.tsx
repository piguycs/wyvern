import React from "react"
import '../styles/trysignin.css'

function loadingMsg() {
    return (
        <div style={{ color: "#f0f8ff" }}>
            <h3>Trying to load wyvern</h3>
            <p>If the app does not load then kick kunal's ass</p>
            <a href="/signin" className="a_tsin">and press me</a>
        </div>
    )
}

export default loadingMsg