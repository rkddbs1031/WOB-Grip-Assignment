import { IListItem } from 'types/movie'

import styles from './Movie.module.scss'
import ImgNone from '../_shared/MovieImage'

interface Props {
  item: IListItem
}

const Items = ({ item }: Props) => {
  return(
    <li>
      <button type='button' className={styles.movieBtn}>
        <dl>
          <div className={styles.imgInfo}>
            <dt>포스터</dt>
            <dd className={styles.imgWrap}>
              {
                item.Poster !== 'N/A' ?
                  <div className={styles.img} style={{backgroundImage: `url(${item.Poster})`}} />
                : 
                  <ImgNone />
              }
            </dd>
          </div>
          <div className={styles.infoWrap}>
            <div>
              <dt>타이틀</dt>
              <dd className={styles.title}>{item.Title}</dd>
            </div>
            <div className={styles.ytWrap}>
              <dt>연도</dt>
              <dd className={styles.year}>{item.Year}</dd>
              <dt>타입</dt>
              <dd className={styles.type}>{item.Type}</dd>
            </div>
          </div>
        </dl>
      </button>
    </li>
  )
}

export default Items