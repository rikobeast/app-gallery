import React from 'react'
import '../styles/game-card.css'
import cardImage from '../images/wotlk-arthas.jpg'

function GameCard(props) {
    return (
        <div className='card'>
            <div className='card-info'>
                <h3 id='card-title'>{props.title}</h3>
                <small id='card-description'>{props.desc}</small>
                <p id='card-item-price'>{props.price}</p>
                <p id='card-item-developer'>{props.developer}</p>
            </div>
        </div>
    )
}

export default GameCard
