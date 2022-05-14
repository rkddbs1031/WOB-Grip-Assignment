import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil'

import { ModalVisible, MovieFavoritList, SelectItem } from 'states/movie'
import { IListItem } from 'types/movie'

import { Favorite3, Favorite2 } from 'assets/svgs/movie'
import styles from 'routes/Routes.module.scss'

const Modal = () => {
  const setModalValue = useSetRecoilState<Boolean>(ModalVisible)
  const [favMovieList, setFavMovieList] = useRecoilState<IListItem[]>(MovieFavoritList)
  const selectItem = useRecoilValue<IListItem[]>(SelectItem)

  const handleRemoveFavorite = () => {
    setFavMovieList(favMovieList.filter((item) => item.imdbID !== Object(selectItem).imdbID))
    setModalValue(false)
  }

  const handleAddFavorite = () => {
    setFavMovieList([...favMovieList, Object(selectItem)])
    setModalValue(false)
  }

  const handleRemoveModal = () => {
    setModalValue(false)
  }

  return (
    <div className={styles.modalWrap}>
      {favMovieList.filter((el) => el.imdbID.includes(Object(selectItem).imdbID)).length > 0 ? (
        <button type='button' className={styles.favRemoveBtn} onClick={handleRemoveFavorite}>
          <Favorite2 />
          <span>즐겨찾기 취소</span>
        </button>
      ) : (
        <button type='button' className={styles.favBtn} onClick={handleAddFavorite}>
          <Favorite3 />
          <span>즐겨찾기</span>
        </button>
      )}
      <button type='button' className={styles.removeBtn} onClick={handleRemoveModal}>
        취소하기
      </button>
    </div>
  )
}
export default Modal
