import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil'
import { useState, useUnmount, useRef, useUpdateEffect, useQuery, useInView, useEffect } from 'hooks'

import { SearchValue, MovieData, ModalVisible, PageNum } from 'states/movie'
import { getMovieSearchApi } from 'services/movie'
import { IListItem } from 'types/movie'

import Loading from '../_shared/Loading'
import ListCard from '../_shared/ListCard'
import Modal from '../_shared/Modal'
import styles from './Movie.module.scss'

const MovieList = () => {
  const getSearchValue = useRecoilValue<string>(SearchValue)
  const [data, setData] = useRecoilState<IListItem[]>(MovieData)
  const [modalShow, setModalShow] = useRecoilState<Boolean>(ModalVisible)
  const [page, setPage] = useRecoilState<number>(PageNum)
  const [totalResults, setTotal] = useState<number>(1)
  const [ref, inView] = useInView()
  const listScroll = useRef<HTMLDivElement>(null)
  const resetSearchValue = useResetRecoilState(SearchValue)
  const resetData = useResetRecoilState(MovieData)

  const { isLoading, refetch } = useQuery(
    ['getMovieSearchApi', getSearchValue, page],
    () =>
      getMovieSearchApi({ s: getSearchValue, page }).then((res) => {
        if (page === 1) {
          listScroll.current?.scrollTo({ top: 0 })
          setData(res.data.Search)
        } else setData((prev) => [...prev, ...res.data.Search])
        setTotal(Number(res.data.totalResults))
      }),
    {
      enabled: !!(getSearchValue && page && (page - 1) * 10 < totalResults),
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      cacheTime: 5 * 10 * 1000,
      staleTime: 5 * 10 * 1000,
    }
  )

  useEffect(() => {
    if (getSearchValue) refetch()
  }, [getSearchValue, refetch])

  useUpdateEffect(() => {
    if (inView) setPage((prev) => prev + 1)
  }, [inView])

  useUnmount(() => {
    resetSearchValue()
    resetData()
    setModalShow(false)
  })

  return (
    <section className={styles.section2}>
      <div className={styles.listWrap} ref={listScroll}>
        {data && totalResults > 1 ? (
          <>
            <h2 className={styles.searchTitle}>검색 결과</h2>
            <ul className={styles.lists}>
              {data.map((item: IListItem) => (
                <ListCard key={`movie-${item.imdbID}`} item={item} />
              ))}
            </ul>
            <div className={styles.target} ref={ref} />
            {modalShow && <Modal />}
          </>
        ) : (
          <h2 className={styles.result}>검색 결과가 없습니다.</h2>
        )}
        {inView && isLoading && <Loading />}
      </div>
    </section>
  )
}

export default MovieList
