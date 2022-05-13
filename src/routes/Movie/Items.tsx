import { MouseEvent, useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import _ from 'lodash'

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
  const favMovieList = useRecoilValue(MovieFavoritList)

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
  // console.log(favMovieList)
  // console.log(_.findIndex(favMovieList, 'imdbID', Number(item.imdbID)))

  // useEffect(() => {
  //   favMovieList.map((key) => {
  //     return key.imdbID === item.imdbID ? setIsChecked(true) : setIsChecked(false)
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
              <dd className={styles[item.Type]}>{item.Type}</dd>
            </div>
            {/* Test */}
            <span style={{ color: 'red' }} />
            {/* {_.findIndex(favMovieList, { imdbID: item.imdbID })} */}
          </div>
        </dl>
      </button>
    </li>
  )
}

export default Items
