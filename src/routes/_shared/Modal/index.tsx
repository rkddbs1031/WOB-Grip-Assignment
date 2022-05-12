import { useSetRecoilState } from 'recoil'
import { ModalVisible } from 'states/movie'
import { Favorite2 } from 'assets/svgs/movie'

import styles from 'routes/Movie/Movie.module.scss'


const Modal = () => {

  const setModalValue = useSetRecoilState(ModalVisible)

  const handleRemoveFavorite = () => {

  }    

  const handleRemoveModal = () => {
    setModalValue(false)
  }

  return( 
    
    <div className={styles.modalWrap}>
      <button type='button' className={styles.favBtn} onClick={handleRemoveFavorite}>
        <Favorite2 />
        <span>즐겨찾기</span>
      </button>
      <button type='button' className={styles.removeBtn} onClick={handleRemoveModal}>취소하기</button>
    </div>
  )
}
export default Modal