import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import registerServiceWorker from './registerServiceWorker'

/*
    Change bootstrap primary color to #00a4dd while you don't know sass
*/

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
