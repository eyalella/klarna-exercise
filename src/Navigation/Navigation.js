import React from 'react'
import { Link } from 'react-router'
import styles from './Navigation.css'

const Navigation = React.createClass({
  render () {
    return (
      <div className={styles.container}>
        <nav className={styles.navigation}>
          <Link
            to='/search'
            className={styles.link}
            activeClassName={styles.active}
          >search</Link>
        </nav>
      </div>
    )
  }
})

export default Navigation
