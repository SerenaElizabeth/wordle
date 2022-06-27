import React, {useState} from 'react'
import Keyboard from '../Keyboard'

const Game: React.FC = () => {

    const wordList = ["funky", "mouse", "plant", "crime", "night"]
    let wordArray = Array.from(wordList[Math.floor(Math.random() * wordList.length)]) //gets random word, creates array from letters

    //create grid state

    const [grid, setGrid] = useState([[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}],[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}] ,[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}] ,[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}] ,[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}] ])

    function handleLetterInput(rowIndex: number, boxIndex: number,value:string) {
        const newArray = [...grid]; //create new array with value of grid
        newArray[rowIndex].splice(boxIndex, 1, {letter:value, color:"grey"}) //in the new array replace the changed value to include the letter & change color to grey
        if (grid[rowIndex][boxIndex].letter === wordArray[boxIndex]) {
            newArray[rowIndex].splice(boxIndex, 1, {letter:value, color:"green"}) //if correct letter in correct place change color to green
            console.log("letter match - correct index")
        } else if (wordArray.filter(letter => letter === grid[rowIndex][boxIndex].letter).length > 0) { //use some instead of filter? better performance?
            newArray[rowIndex].splice(boxIndex, 1, {letter:value, color:"yellow"}) //if correct letter in wrong place change color to yellow
            console.log("letter match - wrong index")
        }
        console.log(newArray)
        setGrid(newArray)
        grid.forEach((word) => {
            //console.log(wordArray)
            if (word.join('') === wordArray.join('')) {
                alert("You won")
            }
        })
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