import SearchBox from '../_shared/SearchBox'
import MovieList from './List'

import styles from './Movie.module.scss'

const Movie = () => {
  return (
    <main>
      <section className={styles.section1}>
        <SearchBox />
      </section>
      <section className={styles.section2}>
        <MovieList />
      </section>
    </main>
  )
}
export default Movie
