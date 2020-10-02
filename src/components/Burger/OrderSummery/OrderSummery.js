import React from 'react'

import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const orderSummery = (props) => {
    const ingredientSummery = Object.keys(props.ingredients)
        .map((igKey, i) => {
            return (
                <li key={igKey + i}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            )
        })
    return (
        <Aux>
            <h2>YOUR ORDER</h2>
            <h3>A delicious burger with following ingredients :</h3>
            <ul>
                {ingredientSummery}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)} </strong></p>
            <p>Continue to Checkout ?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
}

export default orderSummery