import React from 'react'
import './keyboard.css'

const Keyboard = ({}) => {
  return (
    <div className='keyboard-container'>
        <div className='keyboard-row'>
          {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((key) => (
            <div className='keyboard-button' >{key}</div>
          ))}
        </div>
        <div className='keyboard-row'>
          {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((key) => (
            <div className='keyboard-button'>{key}</div>
          ))}
        </div>
        <div className='keyboard-row'>
          {["enter", "z", "x", "c", "v", "b", "n", "m", "<"].map(
            (key) => (
              <div className='keyboard-button'>{key}</div>
            )
          )}
        </div>
    </div>
  )
}

export default Keyboard