import React from 'react'
import '../styles/sort-by.css'

function GameCardSorter() {
    return (
        <div className='sort-by'>
            <select name='sort' id='sort'>
                <option value='popularity'>Popularity</option>
                <option value='uploaded'>Date added</option>
                <option value='price'>Price</option>
                <option value='name'>Name</option>
            </select>
        </div>
    )
}

export default GameCardSorter
