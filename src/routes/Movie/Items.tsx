import { MouseEvent, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { IListItem } from 'types/movie'
import { SelectItem, ModalVisible, MovieFavoritList } from 'states/movie'

import styles from './Movie.module.scss'
import ImgNone from '../_shared/MovieImage'

interface Props {
  item: IListItem
}

const Items = ({ item }: Props) => {
  const setSelectItem = useSetRecoilState(SelectItem)
  const setModalShow = useSetRecoilState(ModalVisible)
  const [isChecked, setIsChecked] = useState<Boolean>(false)

  // 이 데이터로 즐찾 여부 확인
  const favMovieList = useRecoilState(MovieFavoritList)

  const handleModal = (e: MouseEvent<HTMLButtonElement>) => {
    const { poster, title, year, type, id } = e.currentTarget.dataset
    const items = {
      Poster: poster,
      Title: title,
      Type: type,
      Year: year,
      imdbID: id,
    }
    setSelectItem(Object(items))
    setModalShow(true)
  }

  // useEffect(() => {
  //   favMovieList[0].map(( key ) => {
  //     key.imdbID === item.imdbID ? setIsChecked(true) : setIsChecked(false)
  //   })
  // }, [favMovieList, item.imdbID])

  return (
    <li>
      <button
        type='button'
        className={styles.movieBtn}
        data-poster={item.Poster}
        data-title={item.Title}
        data-type={item.Type}
        data-year={item.Year}
        data-id={item.imdbID}
        onClick={handleModal}
      >
        <dl>
          <div className={styles.imgInfo}>
            <dt>포스터</dt>
            <dd className={styles.imgWrap}>
              {item.Poster !== 'N/A' ? (
                <div className={styles.img} style={{ backgroundImage: `url(${item.Poster})` }} />
              ) : (
                <ImgNone />
              )}
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
            {/* Test */}
            <span style={{ color: 'red' }}>
              {
                //  favMovieList[0].map((key) => (
                //    key.imdbID === item.imdbID ? (
                //      <span>즐찾 있음!!</span>
                //    ) : (
                //      <span>즐찾 없음!!</span>
                //    )
                //  ))
              }
            </span>
          </div>
        </dl>
      </button>
    </li>
  )
}

export default Items
