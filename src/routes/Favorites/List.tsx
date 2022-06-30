import { useRecoilState, useRecoilValue } from 'recoil'

import { useUnmount } from 'hooks'
import { MovieFavoritList, ModalVisible } from 'states/movie'
import { IListItem } from 'types/movie'

import FavItems from './Items'
import Modal from '../_shared/Modal'
import styles from './Favorite.module.scss'

const FavList = () => {
  const favMovieList = useRecoilValue<IListItem[]>(MovieFavoritList)
  const [modalShow, setModalShow] = useRecoilState<Boolean>(ModalVisible)

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
    <h2 className={styles.result}>즐겨찾기가 없습니다 😖</h2>
  )
}

export default FavList
