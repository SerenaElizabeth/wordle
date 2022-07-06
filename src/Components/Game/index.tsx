import React, {useState} from 'react'
import { IGameProps } from "../../App"


const Game: React.FC<IGameProps> = ({wordArray, setGameOver, gameIsOver}) => {

    //create grid state
    
    const [grid, setGrid] = useState([[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}],[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}] ,[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}] ,[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}] ,[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}] ])
    
    
    // create copy of grid to be updated after letter input
    
    const newArray = JSON.parse(JSON.stringify(grid));


    function handleLetterInput(rowIndex: number, boxIndex: number,value:string) {
        
        
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
        
        if(boxIndex===4){

            //TODO:  first check if work entered is a valid word? use dictionary API
            setGrid(newArray)
        }
        
        if (value.length>=1){
            if (boxIndex===4){
                boxIndex=0
                rowIndex=rowIndex+1
            } else {
                boxIndex=boxIndex+1
                rowIndex=rowIndex
            }

            const nextSibling = document.querySelector(
                `input[data-row='${rowIndex.toString()}'][data-box='${boxIndex}']`) as HTMLElement | null;
            if (nextSibling !== null) {
                nextSibling.focus();
              }
        }
    }
    
    

    return (
        <>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="row">{row.map((box, boxIndex) => (
                    <input data-row={rowIndex} data-box={boxIndex} key={boxIndex} className={"box " + box.color} type="text" onChange={(e) => handleLetterInput(rowIndex, boxIndex, e.target.value)} />
                ))}</div>
            ))}
        </>
    )
}

export default Game