import React, { Component } from 'react';
import Auxiliary from '../../components/hoc/Auxiliary';

class BurgerBuilder extends Component {
    render() {
        return (
                <Auxiliary>
                    <div>Burger</div>
                    <div>Build Controls</div>
                </Auxiliary>
        )
    }
}

export default BurgerBuilder;
