import { Routes, Route } from 'react-router-dom'

import Nav from './_shared/LNB'
import Movie from './Movie'
import Favorites from './Favorites'
import styles from './Routes.module.scss'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <header className={styles.header}>
          <h1 className={styles.title}> MovieApp </h1>
        </header>
        <Nav />
        <main>
          <Routes>
            <Route path='/' element={<Movie />} />
            <Route path='favorites' element={<Favorites />} />
            <Route path='*' element={<div> 404 </div>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
export default App
