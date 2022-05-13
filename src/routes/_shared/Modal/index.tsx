import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil'
import { useParams } from 'react-router-dom'

import { ModalVisible, MovieFavoritList, SelectItem } from 'states/movie'
import { Favorite3, Favorite2 } from 'assets/svgs/movie'

import styles from 'routes/Routes.module.scss'

const Modal = () => {
  const params = useParams()

  const setModalValue = useSetRecoilState(ModalVisible)
  const [favMovieList, setFavMovieList] = useRecoilState(MovieFavoritList)
  const selectItem = useRecoilValue(SelectItem)

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
      {params.favorites === 'favorites' ? (
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
