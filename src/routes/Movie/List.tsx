import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil'

import { useEffect, useUnmount } from 'hooks'
import { SearchValue, MovieData } from 'states/movie'
import { getMovieSearchApi } from 'services/movie'
import { IListItem } from 'types/movie'

import styles from './Movie.module.scss'
import MovieItems from './Items'


const MovieList = () => {
  const getSearchValue = useRecoilValue(SearchValue)
  const resetSearchValue = useResetRecoilState(SearchValue)
  const [ data, setData ] = useRecoilState<IListItem[]>(MovieData)

  useEffect(() => {
    // 검색단어가 들어오면 api 요청하기
    // page값 수정해야함
    getMovieSearchApi({
      s: getSearchValue,
      page: 1
    }).then(( res ) => setData( res.data.Search ))
  }, [ getSearchValue, setData ])

  useUnmount(() => {
    resetSearchValue()
  })

  return (
    <>
      <h2 className={styles.listTitle}>Movie List</h2>
      {
        data && getSearchValue ? (          
          <ul className={styles.lists}>
            {
                data.map(( item ) => (
                  <MovieItems key={`item-${item.imdbID}`} item={item} />
                  ))
                }
          </ul>
        ) :(
          <span className={styles.result}>검색 결과가 없습니다</span>
        )
      }
    </>
  )
}

export default MovieList