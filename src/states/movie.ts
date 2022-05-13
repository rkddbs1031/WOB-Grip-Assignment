import { atom } from 'hooks/state'
import { recoilPersist } from 'recoil-persist'

import { IListItem } from 'types/movie'

const { persistAtom } = recoilPersist()

export const MovieFavoritList = atom<IListItem[]>({
  key: '#MovieFavoritList',
  default: [],
  effects_UNSTABLE: [persistAtom], // 새로고침해도 유지
})

export const SelectItem = atom<IListItem[]>({
  key: '#SelectItem',
  default: [
    {
      Title: '',
      Type: '',
      Year: '',
      imdbID: '',
      Poster: '',
    },
  ],
})

export const ModalVisible = atom<Boolean>({
  key: '#ModalVisible',
  default: false,
})

export const MovieData = atom<IListItem[]>({
  key: '#MovieData',
  default: [],
})

export const PageNum = atom({
  key: '#PageNum',
  default: 1,
})

export const SearchValue = atom<string>({
  key: '#SearchValue',
  default: '',
})
