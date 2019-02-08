import React, { Component } from 'react';
import Aux from '../../hoc/Wrapper'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4

    }

    addIngredientsHandler = (type) => {
        this.setState((previousState) => {
            const updatedIngredients = {
                ...previousState.ingredients
            }
            updatedIngredients[type] = previousState.ingredients[type] + 1;
            const newPrice = previousState.totalPrice + INGREDIENT_PRICES[type]
            return {
                totalPrice: newPrice,
                ingredients: updatedIngredients
            }
        })
    }

    removeIngredientsHandler = (type) => {
        this.setState((previousState) => {
            const ingredientsCount = previousState.ingredients[type];
            if (ingredientsCount <= 0) {
                return;
            }

            const updatedIngredients = {
                ...previousState.ingredients
            }
            updatedIngredients[type] = ingredientsCount - 1;
            const newPrice = previousState.totalPrice - INGREDIENT_PRICES[type]
            return {
                totalPrice: newPrice,
                ingredients: updatedIngredients
            }
        })
    }



    render() {
        const disabledIngredients = { ...this.state.ingredients }
        for (let key in disabledIngredients) {
            disabledIngredients[key] = disabledIngredients[key] <= 0;
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientsHandler}
                    ingredientRemoved={this.removeIngredientsHandler}
                    disabledIngredients={disabledIngredients}
                    price={this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;