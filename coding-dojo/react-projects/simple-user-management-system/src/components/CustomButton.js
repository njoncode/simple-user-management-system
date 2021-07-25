import React from 'react';
import '../styles/customButton.css';

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => {
    console.log(children, isGoogleSignIn, otherProps)
    return (
    <button className='custom-button'>
        {children}
    </button>
)
}
export default CustomButton;