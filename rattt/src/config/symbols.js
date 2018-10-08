import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faCoffee,
    faCookieBite
} from '@fortawesome/free-solid-svg-icons'

const symbols = {
    X: <span className='blockContent'>X</span>,
    O: <span className='blockContent'>O</span>,
    Cookie: <span className='blockContent'><FontAwesomeIcon icon={faCookieBite} /></span>,
    Café: <span className='blockContent'><FontAwesomeIcon icon={faCoffee} /></span>,
}

export default symbols