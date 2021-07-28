import { useState, useEffect } from "react";

interface coords{
    x: null | number,
    y: null | number
}

const getMouse = () => {
    const [mousePosition, setMousePosition] = useState<coords>({ x: null, y: null })

    const updateMousePosition = (ev: { clientX: any, clientY: any; }) => {
        setMousePosition({ x: ev.clientX, y: ev.clientY })
    }

    useEffect(() => {
        window.addEventListener("mousemove", updateMousePosition)

        return () => window.removeEventListener("mousemove", updateMousePosition)
    }, [])

    return mousePosition
}

export default getMouse