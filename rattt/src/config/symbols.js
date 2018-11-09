import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faCoffee,
    faCookieBite
} from '@fortawesome/free-solid-svg-icons'

//Change emojis to local svg's

const symbols = {
    X: <span className='blockContent'>X</span>,
    O: <span className='blockContent'>O</span>,
    Cookie: <span className='blockContent'><FontAwesomeIcon icon={faCookieBite} /></span>,
    Café: <span className='blockContent'><FontAwesomeIcon icon={faCoffee} /></span>,
    Pizza: <span className='blockContent'><i className="em-svg em-pizza"></i></span>
}

// Pizza: <span aria-label="Pizza Emoji" className='blockContent emojiIcon' role="img">🍕</span>
export default symbols