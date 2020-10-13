import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'

import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.6,
    meat: 1.2
}

class BurgerBuilder extends Component {
    constructor() {
        super()
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false
        }
    }

    updatePurchasableState(ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)

        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount

        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchasableState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount

        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchasableState(updatedIngredients)
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true 
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max Well',
                address: {
                    street: 'TestStreet',
                    zipCode: '56489',
                    country: 'Germany'
                },
                email: 'testmail@gamil.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => this.setState({
                loading: false,
                purchasing: false
            }))
            .catch(error => this.setState({
                loading: false,
                purchasing: false
            }))
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummery = <OrderSummery 
            ingredients={this.state.ingredients} 
            purchaseCanceled={this.purchaseCancelHandler} 
            purchaseContinued={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice} />

        if (this.state.loading) {
            orderSummery = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummery}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls 
                    addedIngredients={this.addIngredientsHandler}
                    removedIngredients={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler} />
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)
