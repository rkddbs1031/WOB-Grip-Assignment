import { useRecoilState, useRecoilValue } from 'recoil'

import { useUnmount } from 'hooks'
import { MovieFavoritList, ModalVisible } from 'states/movie'
import { IListItem } from 'types/movie'

import Modal from '../_shared/Modal'
import styles from './Favorite.module.scss'
import ListCard from 'routes/_shared/ListCard'

const FavList = () => {
  const favMovieList = useRecoilValue<IListItem[]>(MovieFavoritList)
  const [modalShow, setModalShow] = useRecoilState<Boolean>(ModalVisible)

  useUnmount(() => {
    setModalShow(false)
  })

  return favMovieList.length > 0 ? (
    <>
      <h2>
        내 즐겨찾기 <span>❤</span>{' '}
      </h2>
      <ul className={styles.list}>
        {favMovieList.map((list) => (
          <ListCard key={`fav-${list.imdbID}`} item={list} />
        ))}
      </ul>
      {modalShow && <Modal />}
    </>
  ) : (
    <h2 className={styles.result}>즐겨찾기가 없습니다 😖</h2>
  )
}

export default FavList
