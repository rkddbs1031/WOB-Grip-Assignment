import Nav from '../_shared/LNB'
import FavList from './List'

import styles from './Favorite.module.scss'

const Favorites = () => {
  return (
    <main>
      <section className={styles.section1}>
        <FavList />
      </section>
    </main>
  )
}

export default Favorites
