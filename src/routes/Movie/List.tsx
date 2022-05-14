import { useInView } from 'react-intersection-observer'
import { useUpdateEffect } from 'react-use'
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil'

import { useState, useUnmount, useCallback } from 'hooks'
import { SearchValue, MovieData, ModalVisible, PageNum } from 'states/movie'
import { getMovieSearchApi } from 'services/movie'
import { IListItem, IParams } from 'types/movie'

import MovieItems from './Items'
import Modal from '../_shared/Modal'
import styles from './Movie.module.scss'

const MovieList = () => {
  const getSearchValue = useRecoilValue<string>(SearchValue)
  const [data, setData] = useRecoilState<IListItem[]>(MovieData)
  const resetSearchValue = useResetRecoilState(SearchValue)
  const resetData = useResetRecoilState(MovieData)
  const [modalShow, setModalShow] = useRecoilState<Boolean>(ModalVisible)
  const [page, setPage] = useRecoilState<number>(PageNum)
  const [totalResults, setTotal] = useState<number>(0)
  const [isLoading, setLoading] = useState<Boolean>(false)
  const [ref, inView] = useInView()

  const getItems = useCallback(
    (params: IParams) => {
      const { keyword, pageNum } = params
      if (keyword && pageNum) {
        setLoading(false)
        getMovieSearchApi({
          s: keyword,
          page: pageNum,
        }).then((res) => {
          if (pageNum === 1) {
            setData(res.data.Search)
            setTotal(Number(res.data.totalResults))
          } else {
            setData((prev) => [...prev, ...res.data.Search])
          }
          setPage((prev) => prev + 1)
        })
        setLoading(true)
      } else {
        setLoading(false)
      }
    },
    [setData, setPage]
  )

  useUpdateEffect(() => {
    getItems({ keyword: getSearchValue, pageNum: page })
  }, [getSearchValue])

  useUpdateEffect(() => {
    if (inView && isLoading && page !== 1 && (page - 1) * 10 < totalResults) {
      getItems({ keyword: getSearchValue, pageNum: page })
    }
  }, [getSearchValue, inView])

  useUnmount(() => {
    resetSearchValue()
    resetData()
    setModalShow(false)
  })

  return (
    <div className={styles.listWrap}>
      {data && getSearchValue ? (
        <>
          <h2 className={styles.searchTitle}>검색 결과</h2>
          <ul className={styles.lists}>
            {data.map((item, idx) => (
              <MovieItems key={`item-${idx}-${item.imdbID}`} item={item} />
            ))}
          </ul>
          {modalShow && <Modal />}
        </>
      ) : (
        <span className={styles.result}>검색 결과가 없습니다</span>
      )}
      {isLoading && inView && (page - 1) * 10 < totalResults ? (
        <div className={styles.loading}>
          <span />
          <span />
          <span />
        </div>
      ) : (
        <div />
      )}
      <div className={styles.target} ref={ref} />
    </div>
  )
}

export default MovieList
