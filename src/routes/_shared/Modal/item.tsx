import { IListItem } from 'types/movie'
import ImgNone from 'routes/_shared/MovieImgNone'
import styles from 'routes/Routes.module.scss'

interface IProps {
  item: IListItem
}

const SelectItem = ({ item }: IProps) => {
  return (
    <div className={styles.selectWrap}>
      <div className={styles.imgWrap}>
        {Object(item).Poster !== 'N/A' ? (
          <div className={styles.img} style={{ backgroundImage: `url(${item.Poster})` }} />
        ) : (
          <ImgNone />
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{item.Title}</div>
        <div className={styles.ytWrap}>
          <div className={styles.year}>{item.Year}</div>
          <div className={styles.type}>{item.Type}</div>
        </div>
      </div>
    </div>
  )
}
export default SelectItem
