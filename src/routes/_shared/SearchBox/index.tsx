import { ChangeEvent, FormEvent } from 'react'
import { useSetRecoilState } from 'recoil'

import { useState } from 'hooks'
import { SearchValue, PageNum } from 'states/movie'

import styles from 'routes/Movie/Movie.module.scss'
import { SearchIcon48 } from 'assets/svgs/movie'

const SearchBox = () => {
  const setSearchValue = useSetRecoilState(SearchValue)
  const [value, setValue] = useState('')
  const setPage = useSetRecoilState(PageNum)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    setSearchValue(value)
    setPage(1)
    // 처음에는 page를 1로 리셋
  }

  const handleSearchKeyword = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

  return (
    <form onSubmit={handleSubmit} className={styles.searchBox}>
      <input type='text' placeholder='search' onChange={handleSearchKeyword} />
      <button type='submit' className={styles.searchBtn}>
        <SearchIcon48 className={styles.submit} />
      </button>
    </form>
  )
}

export default SearchBox
