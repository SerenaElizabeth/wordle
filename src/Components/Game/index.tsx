import React, {useState, useEffect} from 'react'
import { IGameProps } from "../../App"
import Keyboard from '../Keyboard';


export interface IKeyboardProps {
    handleLetterClick:(letter:string)=>void
  }

const Game: React.FC<IGameProps> = ({wordArray, setGameOver, gameIsOver}) => {


      const [grid, setGrid] = useState([{completed:false, rowArray:[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}]},{completed:false, rowArray:[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}]},{completed:false, rowArray:[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}]},{completed:false, rowArray:[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}]},{completed:false, rowArray:[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}]}])
      
      const [rowNumber, setRowNumber] = useState(0)
      const [boxNumber, setBoxNumber] = useState(0)
      const [rowComplete, setRowComplete] = useState(false)
      const [errorMessage, setErrorMessage] = useState("")
      
      
      let keyboardProps:IKeyboardProps = {

        handleLetterClick:(letter)=>{
            const newArray = JSON.parse(JSON.stringify(grid)); //creates copy of grid to update
            
            newArray[rowNumber].rowArray.splice(boxNumber, 1, {letter:letter, color:"grey"}) //in the new array replace the changed value to include the letter & change color to grey   
            
            if (newArray[rowNumber].rowArray[boxNumber].letter === wordArray[boxNumber]) {
                //if letter correct & in right place, update color to green
                newArray[rowNumber].rowArray.splice(boxNumber, 1, {letter:letter, color:"green"}) 
            }
                //if on final box, and all in the current row array are green, end game
                
                // if (boxNumber===4 && newArray[rowNumber].every((obj:{letter:string; color:string})=>obj.color === 'green')){
                //     setGameOver(gameIsOver)
                // }
                
            else if (wordArray.filter(letter => letter === newArray[rowNumber].rowArray[boxNumber].letter)) { 
            
                //if letter correct & in wrong place, update color to yellow
                newArray[rowNumber].rowArray.splice(boxNumber, 1, {letter:letter, color:"yellow"}) 
            
            }

            setGrid(newArray)
            let newBoxNum = boxNumber+1
            setBoxNumber(newBoxNum)
        }
    }
            
            //when word is submitted 
            
            // async function handleEnter(e: React.KeyboardEvent){
                
                // if( e.key === 'Enter' ){
                    
                //     let guess = newArray[rowNumber].rowArray.map((obj:{letter:string; color:string})=>obj.letter).join('')
                //     if (guess.length===5){
                //         const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`)
                //         console.log(response)
                //         if(response.ok){
                //             setGrid(newArray)
                //             setRowComplete(true)
                //             let currentRowNumber = rowNumber+1
                //             setRowNumber(currentRowNumber)
                //             setErrorMessage("")
                //             //TODO: disable current row
                //             //TODO: move focus to next row
                            
                            
                //         } else {
                //             setErrorMessage("invalid Word")
                //         }
                //     }
                    
            //     }
            // }
            
            
           

        
   

    return (
        <>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="row">{row.rowArray.map((box, boxIndex) => (
                    <input data-row={rowIndex} data-box={boxIndex} key={boxIndex} className={"box " + box.color} type="text" data-completed={row.completed?"completed" : "incomplete"} value={box.letter}/>
                ))}</div>
                ))}
                <h2>{errorMessage && errorMessage}</h2>
                <Keyboard handleLetterClick={keyboardProps.handleLetterClick}/>

        </>
    )
}

export default Game