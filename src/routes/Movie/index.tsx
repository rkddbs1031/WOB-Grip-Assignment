import styles from './Movie.module.scss'
import Nav from '../_shared/LNB'
import SearchBox from '../_shared/SearchBox'

const Movie = () => {
  return (
    <main className={styles.movieWrap}>
      <Nav />
      <header className={styles.header} >
        <h2 className={styles.movieTitle}> MovieApp </h2>
        <SearchBox />
      </header>
    </main>
  )
}
export default Movie