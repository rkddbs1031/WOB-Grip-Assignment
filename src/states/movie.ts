import { atom } from 'hooks/state'

import { IListItem } from 'types/movie'


export const ModalVisible = atom<Boolean>({
  key: '#ModalVisible',
  default: false
})

export const MovieData = atom<IListItem[]>({
  key: '#MovieData',
  default: [
    {
     Title: '',
     Type: '',
     Year: '',
     imdbID: '',
     Poster: ''
   }
  ]
})

export const SearchValue = atom<string>({
  key: '#SearchValue',
  default: ''
})