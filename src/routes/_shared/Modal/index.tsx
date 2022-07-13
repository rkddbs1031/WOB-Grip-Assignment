import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil'

import { ModalVisible, MovieFavoritList, SelectItem } from 'states/movie'
import { IListItem } from 'types/movie'

import { Favorite3, Favorite2 } from 'assets/svgs/movie'
import Item from './item'
import styles from 'routes/Routes.module.scss'

const Modal = () => {
  const setModalValue = useSetRecoilState<Boolean>(ModalVisible)
  const [favMovieList, setFavMovieList] = useRecoilState<IListItem[]>(MovieFavoritList)
  const selectItem = useRecoilValue<IListItem>(SelectItem)

  const handleRemoveFavorite = () => {
    setFavMovieList(favMovieList.filter((item) => item.imdbID !== Object(selectItem).imdbID))
    setModalValue(false)
  }

  const handleAddFavorite = () => {
    setFavMovieList([...favMovieList, Object(selectItem)])
    setModalValue(false)
  }

  const handleCancelModal = () => {
    setModalValue(false)
  }

  return (
    <div className={styles.modalWrap}>
      <div className={styles.modal}>
        <div className={styles.movieInfo}>
          <div className={styles.selectTitle}>선택항목</div>
          <Item item={selectItem} />
        </div>
        <div className={styles.btnWrap}>
          {favMovieList.filter((el) => el.imdbID.includes(selectItem.imdbID)).length > 0 ? (
            <button type='button' className={styles.favRemoveBtn} onClick={handleRemoveFavorite}>
              <Favorite2 />
              <span>즐겨찾기 취소</span>
            </button>
          ) : (
            <button type='button' className={styles.favBtn} onClick={handleAddFavorite}>
              <Favorite3 />
              <span>즐겨찾기 추가</span>
            </button>
          )}
          <button type='button' className={styles.removeBtn} onClick={handleCancelModal}>
            취소
          </button>
        </div>
      </div>
    </div>
  )
}
export default Modal
