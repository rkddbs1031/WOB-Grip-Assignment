import Nav from '../_shared/LNB'
import FavList from './List'
import styles from './Favorite.module.scss'

const Favorites = () => {
  return (
    <main className={styles.favWrap}>
      <Nav />
      <header className={styles.header}>
        <h2 className={styles.favTitle}> MovieApp </h2>
      </header>
      <section className={styles.section1}>
        <h2>
          내 즐겨찾기 <span>❤</span>{' '}
        </h2>
        <FavList />
      </section>
    </main>
  )
}

export default Favorites
