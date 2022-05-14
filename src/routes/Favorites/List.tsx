import { useRecoilState, useRecoilValue } from 'recoil'

import { useUnmount } from 'hooks'
import { MovieFavoritList, ModalVisible } from 'states/movie'

import styles from './Favorite.module.scss'
import FavItems from './Items'
import Modal from '../_shared/Modal'

const FavList = () => {
  const favMovieList = useRecoilValue(MovieFavoritList)
  const [modalShow, setModalShow] = useRecoilState(ModalVisible)

  useUnmount(() => {
    // 모달 닫지 않고 넘어가도 reset
    setModalShow(false)
  })

  return favMovieList.length > 0 ? (
    <>
      <h2>
        내 즐겨찾기 <span>❤</span>{' '}
      </h2>
      <ul className={styles.list}>
        {favMovieList.map((list) => (
          <FavItems key={`fav-${list.imdbID}`} items={list} />
        ))}
      </ul>
      {modalShow && <Modal />}
    </>
  ) : (
    <span className={styles.result}>즐겨찾기가 없습니다 😖</span>
  )
}

export default FavList
