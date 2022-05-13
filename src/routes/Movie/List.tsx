import { InView, useInView } from 'react-intersection-observer'
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil'
import { useUpdateEffect } from 'react-use'
import { useCallback } from 'react'
import { useState, useUnmount, useEffect, useRef } from 'hooks'
import { SearchValue, MovieData, ModalVisible, PageNum } from 'states/movie'
import { getMovieSearchApi } from 'services/movie'
import { IListItem } from 'types/movie'

import styles from './Movie.module.scss'
import MovieItems from './Items'
import Modal from '../_shared/Modal'

interface IParams {
  keyword: string
  pageNum: number
}

const MovieList = () => {
  const getSearchValue = useRecoilValue<string>(SearchValue)
  const resetSearchValue = useResetRecoilState(SearchValue)
  const [data, setData] = useRecoilState<IListItem[]>(MovieData)
  const [modalShow, setModalShow] = useRecoilState<Boolean>(ModalVisible)
  const [page, setPage] = useRecoilState<number>(PageNum)
  const [isLoading, setLoading] = useState<Boolean>(false)
  const [ref, inView] = useInView()

  const getItems = useCallback(
    (params: IParams) => {
      const { keyword, pageNum } = params

      setLoading(false)
      getMovieSearchApi({
        s: keyword,
        page: pageNum,
      }).then((res) => {
        if (pageNum === 1) {
          setData(res.data.Search)
        } else {
          setData((prev) => [...prev, ...res.data.Search])
        }
        setPage((prev) => prev + 1)
      })
      setLoading(true)
    },
    [setData, setPage]
  )

  useUpdateEffect(() => {
    getItems({ keyword: getSearchValue, pageNum: page })
  }, [getSearchValue])

  useEffect(() => {
    if (inView && isLoading && page !== 1) {
      getItems({ keyword: getSearchValue, pageNum: page })
    }
  }, [getItems, getSearchValue, inView, isLoading, page])

  useUnmount(() => {
    resetSearchValue()
    setModalShow(false)
  })

  return (
    <>
      <h2 className={styles.listTitle}>Movie List {inView.toString()}</h2>
      <div className={styles.listWrap}>
        {data && getSearchValue ? (
          <>
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
        <div>Loading...{JSON.stringify(isLoading)}</div>
        {isLoading ? <div className={styles.target} ref={ref} /> : <div />}
      </div>
    </>
  )
}

export default MovieList
