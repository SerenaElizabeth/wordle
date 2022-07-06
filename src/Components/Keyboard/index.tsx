import React from 'react'
import { IGameProps, IKeyboardProps } from '../../App'
import './keyboard.css'

const Keyboard: React.FC<IKeyboardProps>= ({handleClick}) => {
  return (
    <div className='keyboard-container'>
        <div className='keyboard-row'>
          {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((key) => (
            <div key={key} id={key} onClick={(event)=>{
              const target = event.target as HTMLElement;
              handleClick(target.id)}} className='keyboard-button' >{key}</div>
          ))}
        </div>
        <div className='keyboard-row'>
          {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((key) => (
            <div key={key} id={key} onClick={(event)=>{
              const target = event.target as HTMLElement;
              handleClick(target.id)}} className='keyboard-button'>{key}</div>
          ))}
        </div>
        <div className='keyboard-row'>
          {["enter", "z", "x", "c", "v", "b", "n", "m", "<"].map(
            (key) => (
              <div key={key} id={key}  onClick={(event)=>{
                const target = event.target as HTMLElement;
                handleClick(target.id)}} className='keyboard-button'>{key}</div>
            )
          )}
        </div>
    </div>
  )
}

export default Keyboard