import React, {useState} from 'react'
import { IGameProps } from "../../App"
import Keyboard from '../Keyboard';


export interface IKeyboardProps {
    handleLetterClick:(letter:string)=>void
  }

const Game: React.FC<IGameProps> = ({wordArray}) => {
    
    const [gameIsOver, setGameIsOver] = useState(false)
    const startingGrid = [{completed:false, rowArray:[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}]},{completed:false, rowArray:[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}]},{completed:false, rowArray:[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}]},{completed:false, rowArray:[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}]},{completed:false, rowArray:[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}]},{completed:false, rowArray:[{letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}, {letter:"", color:"blue"}]}]
    const [grid, setGrid] = useState(startingGrid)
    const [rowNumber, setRowNumber] = useState(0)
    const [boxNumber, setBoxNumber] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")
      

    async function handleEnterClick(){
        //create array from guessed word
        let guess = grid[rowNumber].rowArray.map((obj)=>obj.letter).filter((letter)=>letter!=="")
        //check if word is too short
        if (guess.length<5){
            setErrorMessage('word too short')
        } else {
            //check if word is valid using api call
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess.join("")}`)
            if(response.ok){
                const temporaryGrid = JSON.parse(JSON.stringify(grid)); //creates copy of grid to update
                temporaryGrid[rowNumber].completed = true //set the row as completed
                setGrid(temporaryGrid) //update grid state
                let newRowNum = rowNumber+1
                setRowNumber(newRowNum)
                setBoxNumber(0)
             } else {
              setErrorMessage("invalid Word")
             }
        }
        //check if game is won

        if (grid[rowNumber].rowArray.every(ob=>ob.color === 'green')){
            setGameIsOver(true)
            console.log('game over')
            console.log(gameIsOver)
            setErrorMessage('you have won')
        }

        //check if game is lost

        if(grid[4].rowArray[4].letter!==''){
            setGameIsOver(true)
            setErrorMessage("you have lost")
        }

 
    }
    
    let keyboardProps:IKeyboardProps = {

        handleLetterClick:(letter)=>{

            const temporaryGrid = JSON.parse(JSON.stringify(grid)); //creates copy of grid to update
            if (letter==='enter'){
                handleEnterClick()
            } else if (letter ==='<' ){
               //check that first letter is not empty 
                if (grid[rowNumber].rowArray[0].letter!==''){
                temporaryGrid[rowNumber].rowArray.splice(boxNumber-1, 1, {letter:"", color:"grey"})
                setGrid(temporaryGrid)
                setBoxNumber(boxNumber-1)
                }
            } else {
            temporaryGrid[rowNumber].rowArray.splice(boxNumber, 1, {letter:letter, color:"grey"}) //in the new array replace the changed value to include the letter & change color to grey   
            console.log(temporaryGrid)
            if (temporaryGrid[rowNumber].rowArray[boxNumber].letter === wordArray[boxNumber]) {
                temporaryGrid[rowNumber].rowArray.splice(boxNumber, 1, {letter:letter, color:"green"}) 
            } else if (wordArray.filter(i => i === letter).length>0) {
                temporaryGrid[rowNumber].rowArray.splice(boxNumber, 1, {letter:letter, color:"yellow"}) 
            }
                setGrid(temporaryGrid)
                let newBoxNum =  boxNumber+1 
                setBoxNumber(newBoxNum)
            }
        }
    }

    function resetGame(){
        setGrid(startingGrid)
        setGameIsOver(false)
        setRowNumber(0)
        setBoxNumber(0)
        setErrorMessage("")
    }
            
    return (
        <div className='game'>
            <div className='board'>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="row">{row.rowArray.map((box, boxIndex) => (
                    <input data-row={rowIndex} data-box={boxIndex} key={boxIndex}  className={`${row.completed?"box " + box.color:"box"} ${box.letter!==''? "filled":""}`} type="text" value={box.letter}/>
                ))}</div>
                ))}
            </div>
                <h2>{errorMessage && errorMessage}</h2>

                {gameIsOver && <button onClick={resetGame}>Start Again</button>}

                {!gameIsOver && <Keyboard handleLetterClick={keyboardProps.handleLetterClick}/>}
        </div>
    )
}

export default Game