import { axios } from 'hooks/worker'
import { IMovieAPIRes, IParams } from 'types/movie.d'

const MOVIE_BASE_URL = 'https://www.omdbapi.com'

export const getMovieSearchApi = (params: IParams) => {
  const { s, page } = params
  return axios.get<IMovieAPIRes>(`${MOVIE_BASE_URL}/?apikey=${process.env.REACT_APP_API_KEY}&s=${s}&page=${page}`)
}
