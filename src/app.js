import React from 'react'
import ReactDom from 'react-dom'
import Search from './routes/Search/components/Search'
import CommentBox from './routes/Comments/components/CommentBox'
import CoreLayout from './layouts/CoreLayout'
import { Router, Route, browserHistory } from 'react-router'

import './app.css'

ReactDom.render((
  <Router history={browserHistory}>
    <Route path='/' component={CoreLayout}>
      <Route path='comments' component={CommentBox} />
      <Route path='search' component={Search} />
    </Route>
  </Router>
), document.getElementById('content'))
