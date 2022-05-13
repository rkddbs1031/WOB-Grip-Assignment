import styles from './Movie.module.scss'
import Nav from '../_shared/LNB'
import SearchBox from '../_shared/SearchBox'
import MovieList from './List'

const Movie = () => {
  return (
    <div className={styles.movieWrap}>
      <Nav />
      <header className={styles.header}>
        <h2 className={styles.movieTitle}> MovieApp </h2>
      </header>
      <main>
        <section className={styles.section1}>
          <SearchBox />
        </section>
        <section className={styles.section2}>
          <MovieList />
        </section>
      </main>
    </div>
  )
}
export default Movie
