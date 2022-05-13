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
  const [ data, setData ] = useRecoilState<IListItem[]>(MovieData)
  const [ modalShow, setModalShow ] =useRecoilState<Boolean>(ModalVisible)
  const [ isLoading, setLoading ] = useState<Boolean>(false)
  const [ page, setPage ] = useRecoilState<number>(PageNum)
  const [ ref, inView ] = useInView()
  
  // 1. 검색을 하면 업데이트에 따라 getItems가 불러온다
  // 2. 데이터를 불러오기전에는 로딩중이고 다 불러왔으면 로딩이 false로 변한다
  // 3. 데이터 마지막에 닿았을 때 즉, inView가 true일 때 & 로딩이 false이때 page는 2값으로 넘어가고 다시 getItems를 불러온다
  // 4. 검색창이 바뀌면 data를 리셋하고 다시 page는 1로 변화하고 다시 getItems를 불러온다.
  // 추가 check => totalpage에서가 34이라고 했을 때 page는 4번만 바뀌면 된다 하지만 다 불러왔음 에도 불구하고 다시 불러온다면 오류!
  // 추가 check => 처음에 inView가 보이면서 page = 1이 두번 나타남 .. 

  
  const getItems = useCallback(( params: IParams ) => {
    const { keyword, pageNum } = params

    setLoading(false)
    getMovieSearchApi({
      s: keyword,
      page: pageNum
    }).then((res) => {
      if ( pageNum === 1 ) {
        setData(res.data.Search)
      } else {
        setData((prev) => [...prev, ...res.data.Search])
      }
      setPage((prev) => prev + 1)
    })
    setLoading(true)
  },[])

  useUpdateEffect(() => {
    getItems({ keyword: getSearchValue, pageNum: page })
  },[getSearchValue])
  

  useEffect(() => {
    if( inView && isLoading && page !== 1) {
      getItems({keyword: getSearchValue, pageNum: page})
    }
  },[getItems, getSearchValue, inView, isLoading, page])

  useUnmount(() => {
    resetSearchValue()
    setModalShow(false)
  })

  return (
    <>
      <h2 className={styles.listTitle}>Movie List { inView.toString() }</h2>
      <div className={styles.listWrap}>
        {
          data ? (    
            <>      
              <ul className={styles.lists} >
                {
                  data.map(( item, idx ) => (
                    <MovieItems key={`item-${idx}-${item.imdbID}`} item={item} />
                    ))
                  }
              </ul>
              { modalShow && <Modal />}
            </>
          ) :(
            <span className={styles.result}>검색 결과가 없습니다</span>
          )
        }
        <div>Loading...{JSON.stringify(isLoading)}</div>
        {
          isLoading ? <div className={styles.target} ref={ref} /> : <div/>
        }
      </div>
    </>
  )
}

export default MovieList