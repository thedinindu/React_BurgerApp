import React, { Component } from 'react'

import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummery extends Component {
    componentDidUpdate() {
        console.log('[OrderSummery] WillUpdate')
    }

    render() {
        const ingredientSummery = Object.keys(this.props.ingredients)
        .map((igKey, i) => {
            return (
                <li key={igKey + i}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
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
                <p><strong>Total Price: {this.props.totalPrice.toFixed(2)} </strong></p>
                <p>Continue to Checkout ?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummery