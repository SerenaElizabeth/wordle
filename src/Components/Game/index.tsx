import React from 'react'

const Game: React.FC = () => {

    const wordList = ["funky", "mouse", "plant", "crime", "night"]
    let wordArray = Array.from(wordList[Math.floor(Math.random() * wordList.length)])  //['f','u','n','k','y']

    const grid = [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]]

    function handleLetterInput(rowIndex: number, boxIndex: number, value: string) {
        grid[rowIndex][boxIndex] = value;
        // console.log(grid);
        if (grid[rowIndex][boxIndex] === wordArray[boxIndex]) {
            console.log("letter match - correct index")
        } else if (wordArray.filter(letter => letter === grid[rowIndex][boxIndex]).length > 0) { //use some instead of filter? better performance?
            console.log("letter match - wrong index")
        }
        grid.forEach((word) => {
            // console.log(word)
            // console.log(wordArray)
            if (word.join('') === wordArray.join('')) {
                alert("You won")
            }
        })
    }



    return (
        <>
            {grid.map((row, rowIndex) => (
                <div className="row">{row.map((box, boxIndex) => (
                    <input className='box' type="text" onChange={(e) => handleLetterInput(rowIndex, boxIndex, e.target.value)} />
                ))}</div>
            ))}
        </>
    )
}

export default Game