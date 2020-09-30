import React from 'react'

import './BurgerControl.css'

const burgerControl = (props) => {
    return (
        <div className="BurgerControl">
            <div className="Label">{props.label}</div>
            <button className="Less" onClick={props.removed} disabled={props.disabled}>Less</button>
            <button className="More" onClick={props.added}>More</button>
        </div>
    )
}

export default burgerControl