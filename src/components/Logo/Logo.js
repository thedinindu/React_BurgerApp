import React from 'react'

import burgerLogo from '../../assets/images/burger-logo.png'
import './Logo.css'

const logo = (props) => {
    return (
        <div className="Logo" style={{height: props.height, marginBottom: props.mBottom}}>
            <img src={burgerLogo} alt="Logo" />
        </div>
    )
}

export default logo