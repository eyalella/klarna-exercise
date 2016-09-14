import React from 'react'
import Navigation from '../../Navigation'
import styles from './CoreLayout.css'

const CoreLayout = ({children}) => (
  <div>
    <Navigation />
    <div className={styles.container}>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.object
}

export default CoreLayout
