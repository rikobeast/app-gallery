import React from 'react'
import GameCard from './GameCard'
import '../styles/game-card.css'
import GameCardSorter from './GameCardSorter'

function GameCardDisplay() {
    return (<>
    <GameCardSorter/>
        <div className='game-display-page'>
            <GameCard title='World of Wacraft' 
                      desc='One of the best MMORPGs ever created!' 
                      price='100.00$' 
                      developer='Blizzard entertainment'/>
            <GameCard title='World of Wacraft' 
                      desc='One of the best MMORPGs ever created!' 
                      price='100.00$' 
                      developer='Blizzard entertainment'/>
            <GameCard title='World of Wacraft' 
                      desc='One of the best MMORPGs ever created!' 
                      price='100.00$' 
                      developer='Blizzard entertainment'/>
            <GameCard title='World of Wacraft' 
                      desc='One of the best MMORPGs ever created!' 
                      price='100.00$' 
                      developer='Blizzard entertainment'/>
            <GameCard title='World of Wacraft' 
                      desc='One of the best MMORPGs ever created!' 
                      price='100.00$' 
                      developer='Blizzard entertainment'/>
            <GameCard title='World of Wacraft' 
                      desc='One of the best MMORPGs ever created!' 
                      price='100.00$' 
                      developer='Blizzard entertainment'/>
            
            <GameCard title='World of Wacraft' 
                      desc='One of the best MMORPGs ever created!' 
                      price='100.00$' 
                      developer='Blizzard entertainment'/>
        </div>
        </>
    )
}

export default GameCardDisplay
