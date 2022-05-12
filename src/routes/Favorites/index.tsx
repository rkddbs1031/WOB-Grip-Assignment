import styles from './Favorite.module.scss'
import Nav from '../_shared/LNB'

const Favorites = () => {
  return (
    <main className={styles.favWrap}>
      <Nav />
      <header className={styles.header} >
        <h2 className={styles.favTitle}> MovieApp </h2>
        <div>Favorite</div>
      </header>
    </main>
  )
}

export default Favorites