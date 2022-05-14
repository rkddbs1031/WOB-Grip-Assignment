import styles from 'routes/Routes.module.scss'

const MovieImage = () => {
  return (
    <div className={styles.imgNone}>
      <span>
        이미지가 <br />
        존재하지 않습니다.
      </span>
    </div>
  )
}
export default MovieImage
