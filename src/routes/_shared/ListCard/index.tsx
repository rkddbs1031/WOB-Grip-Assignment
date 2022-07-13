import { useRecoilValue, useSetRecoilState } from 'recoil'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { IListItem } from 'types/movie'
import { SelectItem, ModalVisible, MovieFavoritList } from 'states/movie'

import ImgNone from '../MovieImgNone'
import styles from './listcard.module.scss'

interface Props {
  item: IListItem
}

const ListCard = ({ item }: Props) => {
  const setSelectItem = useSetRecoilState<IListItem>(SelectItem)
  const setModalShow = useSetRecoilState<Boolean>(ModalVisible)
  const favMovieList = useRecoilValue<IListItem[]>(MovieFavoritList)

  const handleModal = () => {
    const { Poster, Title, Year, Type, imdbID } = item
    const items = { Poster, Title, Type, Year, imdbID }
    setSelectItem(Object(items))
    setModalShow(true)
  }

  return (
    <li>
      <button type='button' className={styles.movieBtn} onClick={handleModal}>
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
          </div>
          <div className={styles.favWrap}>
            <div className={styles.favStar}>
              {favMovieList.filter((el) => el.imdbID.includes(item.imdbID)).length > 0 ? (
                <AiFillHeart />
              ) : (
                <AiOutlineHeart />
              )}
            </div>
          </div>
        </dl>
      </button>
    </li>
  )
}
export default ListCard
