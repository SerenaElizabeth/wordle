import React, {useState, useEffect} from 'react'
import { IGameProps } from "../../App"



const Game: React.FC<IGameProps> = ({wordArray, setGameOver, gameIsOver}) => {
    
    const [grid, setGrid] = useState([[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}],[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}] ,[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}] ,[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}] ,[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}] ])
    
    const [rowNumber, setRowNumber] = useState(0)
    const [rowComplete, setRowComplete] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    
    const newArray = JSON.parse(JSON.stringify(grid));

    //when word is submitted 

    async function handleEnter(e: React.KeyboardEvent){
        
        if( e.key === 'Enter' ){
           
            let guess = newArray[rowNumber].map((obj:{letter:string; color:string})=>obj.letter).join('')
            if (guess.length===5){
                const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`)
                console.log(response)
                if(response.ok){
                    setGrid(newArray)
                    setRowComplete(true)
                    let currentRowNumber = rowNumber+1
                    setRowNumber(currentRowNumber)
                    setErrorMessage("")
                    //TODO: disable current row
                    //TODO: move focus to next row
                    

                } else {
                   setErrorMessage("invalid Word")
                }
            }

          }
    }

    console.log("render")
    
    async function handleLetterInput(rowIndex: number, boxIndex: number,value:string) {
        //on every letter entered, update newArray
        
        newArray[rowIndex].splice(boxIndex, 1, {letter:value, color:"grey"}) //in the new array replace the changed value to include the letter & change color to grey
        
        if (newArray[rowIndex][boxIndex].letter === wordArray[boxIndex]) {
            
            //if letter correct & in right place, update color to green
            
            newArray[rowIndex].splice(boxIndex, 1, {letter:value, color:"green"}) 
            
            
            //if on final box, and all in the current row array are green, end game
            
            if (boxIndex===4 && newArray[rowIndex].every((obj:{letter:string; color:string})=>obj.color === 'green')){
                setGameOver(gameIsOver)
            }
            
            
            
        } else if (wordArray.filter(letter => letter === newArray[rowIndex][boxIndex].letter).length > 0) { 
            
            //if letter correct & in wrong place, update color to yellow
            
            newArray[rowIndex].splice(boxIndex, 1, {letter:value, color:"yellow"}) 
            
        }
        
        //if on final letter, update grid to trigger re-render with new color classes
        
        if (value.length>=1 && boxIndex!==4){
            //disable current input box
            const currentInput = document.querySelector(
                `input[data-row='${rowIndex.toString()}'][data-box='${boxIndex}']`) as HTMLInputElement;
            // currentInput.disabled=true

            // if (boxIndex<=4){
            //     boxIndex=0
            //     rowIndex++
            // } else {
            //     boxIndex=boxIndex+1
            //     rowIndex=rowIndex
            // }

            boxIndex++

            const nextSibling = document.querySelector(
                `input[data-row='${rowIndex.toString()}'][data-box='${boxIndex}']`) as HTMLElement | null;
            if (nextSibling !== null) {
                nextSibling.focus();
              }
        }
    }

 
    
    
    console.log(grid)    

    return (
        <>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="row">{row.map((box, boxIndex) => (
                    <input data-row={rowIndex} data-box={boxIndex} key={boxIndex} className={"box " + box.color} type="text" onChange={(e) => handleLetterInput(rowIndex, boxIndex, e.target.value)} onKeyPress={handleEnter} />
                ))}</div>
                ))}
                <h2>{errorMessage && errorMessage}</h2>
        </>
    )
}

export default Game