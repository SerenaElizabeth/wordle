import React, {useState} from 'react'
import Keyboard from '../Keyboard';
import { WordObj } from "../../App"


const Game: React.FC<WordObj> = ({wordArray}) => {

    
    //create grid state

    const [grid, setGrid] = useState([[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}],[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}] ,[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}] ,[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}] ,[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}] ])

    function handleLetterInput(rowIndex: number, boxIndex: number,value:string) {
        console.log(wordArray)
        const newArray = [...grid]; //create new array with value of grid
        newArray[rowIndex].splice(boxIndex, 1, {letter:value, color:"grey"}) //in the new array replace the changed value to include the letter & change color to grey

        if (grid[rowIndex][boxIndex].letter === wordArray[boxIndex]) {
            
            //if letter correct & in right place 

            newArray[rowIndex].splice(boxIndex, 1, {letter:value, color:"green"}) 
            console.log("CORRECT PLACE letter guessed is", grid[rowIndex][boxIndex].letter)
            console.log("correct letter is", wordArray[boxIndex])

            //check if all green <- amend this only run if on final letter?
            if (grid[rowIndex].every((obj)=>obj.color === 'green')){
                console.log("you won")

                //TODO: change game over to true 
            }

            

        } else if (wordArray.filter(letter => letter === grid[rowIndex][boxIndex].letter).length > 0) { 

            //if letter correct & in wrong place

            newArray[rowIndex].splice(boxIndex, 1, {letter:value, color:"yellow"}) 
            
        } else {
            
            console.log("wrong letter")
        }
        console.log(newArray)
        setGrid(newArray)

    }



    return (
        <>
            {grid.map((row, rowIndex) => (
                <div className="row">{row.map((box, boxIndex) => (
                    <input className={"box " + box.color} type="text" onChange={(e) => handleLetterInput(rowIndex, boxIndex, e.target.value)} />
                ))}</div>
            ))}

            {/* <Keyboard/> */}
        </>
    )
}

export default Game