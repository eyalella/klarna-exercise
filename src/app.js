import React from 'react'
import ReactDom from 'react-dom'
import Search from './routes/Search/components/Search'
import { Router, Route, browserHistory } from 'react-router'

import './app.css'

ReactDom.render((
  <Router history={browserHistory}>
    <Route path='/' component={Search} />
  </Router>
), document.getElementById('content'))
