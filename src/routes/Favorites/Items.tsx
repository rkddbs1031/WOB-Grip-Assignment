import { MouseEvent } from 'react'
import { useSetRecoilState } from 'recoil'

import { IListItem } from 'types/movie'
import { ModalVisible, SelectItem } from 'states/movie'

import ImgNone from '../_shared/MovieImgNone'
import styles from './Favorite.module.scss'

interface Props {
  items: IListItem
}

const FavItems = ({ items }: Props) => {
  const setModalShow = useSetRecoilState<Boolean>(ModalVisible)
  const setSelectItem = useSetRecoilState<IListItem[]>(SelectItem)

  const handleModal = (e: MouseEvent<HTMLButtonElement>) => {
    const { poster, title, year, type, id } = e.currentTarget.dataset
    const item = {
      Poster: poster,
      Title: title,
      Type: type,
      Year: year,
      imdbID: id,
    }
    setSelectItem(Object(item))
    setModalShow(true)
  }
  return (
    <li>
      <button
        type='button'
        className={styles.favBtn}
        data-poster={items.Poster}
        data-title={items.Title}
        data-type={items.Type}
        data-year={items.Year}
        data-id={items.imdbID}
        onClick={handleModal}
      >
        <dl>
          <div className={styles.imgInfo}>
            <dt>포스터</dt>
            <dd className={styles.imgWrap}>
              {items.Poster !== 'N/A' ? (
                <div className={styles.img} style={{ backgroundImage: `url(${items.Poster})` }} />
              ) : (
                <ImgNone />
              )}
            </dd>
          </div>
          <div className={styles.infoWrap}>
            <div>
              <dt>타이틀</dt>
              <dd className={styles.title}>{items.Title}</dd>
            </div>
            <div className={styles.ytWrap}>
              <dt>연도</dt>
              <dd className={styles.year}>{items.Year}</dd>
              <dt>타입</dt>
              <dd className={styles[items.Type]}>{items.Type}</dd>
            </div>
          </div>
        </dl>
      </button>
    </li>
  )
}
export default FavItems
