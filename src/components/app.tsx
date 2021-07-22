import React, { Component, useEffect, useState } from "react"

// Defines the required props
interface ComponentProps {
    isSignedIn : number
}

function app(props: ComponentProps) {
    const [hellolol, lolo] = useState(props.isSignedIn)
    useEffect(() => {
        lolo((hellolol) => hellolol = props.isSignedIn)
    }, [props.isSignedIn])
    return(
        <div>
            <h1>{hellolol}</h1>
            <button onClick={() => console.log(hellolol)}>Hi</button>
        </div>
    )
}

class app_new extends Component<ComponentProps> {
    constructor(props:any) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>{this.props.isSignedIn}</h1>
                <button onClick={() => console.log(this.props.isSignedIn)}>Hi</button>
            </div>
        )
    }

}

export default app_new