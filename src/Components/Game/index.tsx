import React from 'react'

const Game: React.FC = () => {

    const wordList = ["funky", "mouse", "plant", "crime", "night"]
    let wordArray = Array.from(wordList[Math.floor(Math.random() * wordList.length)])
    console.log(wordArray)

    const grid = [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]]

    function handleLetterInput(rowIndex: number, boxIndex: number, value: string) {
        grid[rowIndex][boxIndex] = value
        console.log(grid)
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