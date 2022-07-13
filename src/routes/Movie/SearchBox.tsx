import React, { ChangeEvent, FormEvent } from 'react'
import { useSetRecoilState } from 'recoil'

import { useState, useMount } from 'hooks'
import { SearchValue, PageNum } from 'states/movie'

import { SearchIcon48 } from 'assets/svgs/movie'
import styles from './Movie.module.scss'

const SearchBox = () => {
  const setSearchValue = useSetRecoilState<string>(SearchValue)
  const [value, setValue] = useState<string>('')
  const setPage = useSetRecoilState<number>(PageNum)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    setSearchValue(value)
    setPage(1)
  }

  const handleSearchKeyword = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

  useMount(() => {
    inputRef.current?.focus()
  })

  return (
    <section className={styles.section1}>
      <form onSubmit={handleSubmit} className={styles.searchBox}>
        <input ref={inputRef} type='text' placeholder='3글자 이상으로 검색해 주세요.' onChange={handleSearchKeyword} />
        <button type='submit' className={styles.searchBtn}>
          <SearchIcon48 className={styles.submit} />
        </button>
      </form>
    </section>
  )
}

export default SearchBox
