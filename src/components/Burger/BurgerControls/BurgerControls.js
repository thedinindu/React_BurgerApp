import React from 'react'

import './BurgerControls.css'
import BurgerControl from './BurgerControl/BurgerControl'

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" }
]

const burgerControls = (props) => {
    return (
        <div className="BurgerControls">
            <p>Current Price: <strong>${props.price.toFixed(2)}</strong> </p>
            {controls.map(ctrl => {
                return <BurgerControl 
                    key={ctrl.label} 
                    label={ctrl.label}
                    added={() => props.addedIngredients(ctrl.type)}
                    removed={() => props.removedIngredients(ctrl.type)}
                    disabled={props.disabled[ctrl.type]} />
            })}
            <button 
                className="OrderButton"
                disabled={!props.purchasable}
                onClick={props.ordered} >ORDER NOW</button>
        </div>
    )
}

export default burgerControls