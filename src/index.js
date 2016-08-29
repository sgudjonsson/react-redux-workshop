import React from 'react'
import { render } from 'react-dom'

import App from './App'

import './reset.css'
import './style.css'

// keep anything relating to document or the DOM only in "index.js" file

render(<App />, document.getElementById('root'))