import { useRecoilState, useRecoilValue } from 'recoil'

import { useUnmount } from 'hooks'
import { MovieFavoritList, ModalVisible } from 'states/movie'

import styles from './Favorite.module.scss'
import FavItems from './Items'
import Modal from '../_shared/Modal'

const FavList = () => {
  // 1. 로컬에 있는 거 가져오기
  // 2. map으로 나열하기

  const favMovieList = useRecoilValue(MovieFavoritList)
  const [modalShow, setModalShow] = useRecoilState(ModalVisible)

  useUnmount(() => {
    // 모달 닫지 않고 넘어가도 reset
    setModalShow(false)
  })

  return favMovieList ? (
    <>
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
