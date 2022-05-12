import { MouseEvent } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { IListItem } from 'types/movie'
import { MovieData, ModalVisible } from 'states/movie'

import styles from './Movie.module.scss'
import ImgNone from '../_shared/MovieImage'

interface Props {
  item: IListItem
}

const Items = ({ item }: Props) => {
  const movieData = useRecoilState(MovieData)
  // const setSelectItem = useSetRecoilState(SelectItem)
  const setModalShow = useSetRecoilState(ModalVisible)

  const handleModal = () => {
    setModalShow(true)
  }

  return(
    <li>
      <button type='button' className={styles.movieBtn} 
        data-poster={item.Poster} data-title={item.Title} data-type={item.Type} data-year={item.Year} data-id={item.imdbID}
        onClick={handleModal}
      >
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
            <span>
              {
               movieData.includes(Object(item)) ? <span>즐찾 있음!!</span> 
               : <span>즐찾 없음!!</span>
              }
            </span>
          </div>
        </dl>
      </button>
    </li>
  )
}

export default Items