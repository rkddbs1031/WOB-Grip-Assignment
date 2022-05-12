import { atom } from 'hooks/state'

export const SearchValue = atom<string>({
  key: '#SearchValue',
  default: ''
})