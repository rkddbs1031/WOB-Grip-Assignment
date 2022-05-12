import { Routes, Route } from 'react-router-dom'

import Movie from './Movie'
import Favorites from './Favorites'

import styles from './Routes.module.scss'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Routes >
          <Route path='/' element={<Movie/>}  />
          <Route path=':favorites' element={ <Favorites /> } />
          <Route path='*' element={ <div> 404 </div> } />
        </Routes >
      </div>
    </div>
  )
}

export default App
