import { axios } from 'hooks/worker'
import { IMovieAPIRes } from 'types/movie.d'

const MOVIE_BASE_URL = 'http://www.omdbapi.com'

interface Params {
  s: string
  page: number
}

export const getMovieSearchApi = ( parms: Params ) => {
  const { s, page } = parms
  return axios.get<IMovieAPIRes>(`${MOVIE_BASE_URL}/?apikey=${process.env.REACT_APP_API_KEY}&s=${s}&page=${page}`)
}
