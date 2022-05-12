import { useInView } from 'react-intersection-observer'
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil'
import { useUpdateEffect } from 'react-use'
import { useState, useUnmount, } from 'hooks'
import { SearchValue, MovieData, ModalVisible } from 'states/movie'
import { getMovieSearchApi } from 'services/movie'
import { IListItem } from 'types/movie'

import styles from './Movie.module.scss'
import MovieItems from './Items'
import Modal from '../_shared/Modal'

const MovieList = () => {
  const getSearchValue = useRecoilValue<string>(SearchValue)
  const resetSearchValue = useResetRecoilState(SearchValue)
  const [ data, setData ] = useRecoilState<IListItem[]>(MovieData)
  const resetData = useResetRecoilState(MovieData)
  const [ modalShow, setModalShow ] =useRecoilState<Boolean>(ModalVisible)
  const [ isLoading, setLoading ] = useState<Boolean>(false)
  const [ page, setPage ] = useState<number>(1)
  const [ ref, inView ] = useInView()
  
  // 1. 검색을 하면 업데이트에 따라 getItems가 불러온다
  // 2. 데이터를 불러오기전에는 로딩중이고 다 불러왔으면 로딩이 false로 변한다
  // 3. 데이터 마지막에 닿았을 때 즉, inView가 true일 때 & 로딩이 false이때 page는 2값으로 넘어가고 다시 getItems를 불러온다
  // 4. 검색창이 바뀌면 data를 리셋하고 다시 page는 1로 변화하고 다시 getItems를 불러온다.
  // 추가 check => totalpage에서가 34이라고 했을 때 page는 4번만 바뀌면 된다 하지만 다 불러왔음 에도 불구하고 다시 불러온다면 오류!
  // 추가 check => 처음에 inView가 보이면서 page = 1이 두번 나타남 .. 

  // 데이터 불러오기
  const getItems = () => {
    setLoading(false)
    getMovieSearchApi({
        s: getSearchValue,
        page
      }).then((res) => {
        setData((prev) => [...prev, ...res.data.Search])
        // setData(res.data.Search)
      })
  }
  
  useUpdateEffect(() => {
    // 검색이 바뀌면
    resetData()
    setPage(1)
    getItems()
  }, [getSearchValue])
  
  useUpdateEffect(() => {
    // 마지막 요소를 보았을 때 
    if( inView && !isLoading ) {
      // 페이지 바뀌고
      setPage(prev => prev + 1)
      // getItems()다시 불러온다
      getItems()
    }
  },[ inView ])

  useUnmount(() => {
    resetSearchValue()
    setModalShow(false)
  })

  return (
    <>
      <h2 className={styles.listTitle}>Movie List { inView.toString() }</h2>
      <div className={styles.listWrap}>
        {
        data && getSearchValue ? (    
          <>      
            <ul className={styles.lists} >
              {
                data.map(( item, idx ) => (
                  <MovieItems key={`item-${idx}-${item.imdbID}`} item={item} />
                  ))
                }
            </ul>
            <div ref={ref} style={{backgroundColor: 'red' }}>
              타겟이다..
            </div>
            { modalShow && <Modal />}
          </>
        ) :(
          <span className={styles.result}>검색 결과가 없습니다</span>
        )
      }
      </div>
    </>
  )
}

export default MovieList