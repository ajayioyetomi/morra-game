import React from 'react'
import css from '../css/button.module.css';

const Button = ({click,className,styles,text,disabled=false}) => {
  return (
    <button onClick={click}
    className={`${css.btn} ${className ?className: ''}`} 
    style={styles?styles:{}}
    disabled={disabled}>
        {text}
    </button>
  )
}

export default Button