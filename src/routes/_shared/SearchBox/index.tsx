import { ChangeEvent, FormEvent } from 'react'

import styles from 'routes/Movie/Movie.module.scss'
import { SearchIcon48 } from 'assets/svgs/movie'

import { useState } from 'hooks'
import { useSetRecoilState } from 'recoil'
import { SearchValue } from 'states/movie'

const SearchBox = () => {

  const setSearchValue = useSetRecoilState(SearchValue)
  const [ value, setValue ] = useState('')
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    setSearchValue(value)
  } 

  const handleSearchKeyword = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

  return (
    <form onSubmit={handleSubmit} className={styles.searchBox}>
      <input type='text' placeholder='search' onChange={handleSearchKeyword} />
      <button type='submit'>
        <SearchIcon48 className={styles.submit} />
      </button>
    </form>
  )
}

export default SearchBox