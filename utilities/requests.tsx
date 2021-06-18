import axios from 'axios';
import {AddToLibraryMovie, LibraryMovie} from './types';

const API_URL = 'http://10.0.2.2:3333';

const parseSearchText = (text: string) => {
  return text.replace(/ /g, '+');
};

export const getMoviesFromLibrary = async () => {
  try {
    const response = await axios.get(`${API_URL}/movies/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMoviesFromSearchByTitle = async (title: string) => {
  const parsedTitle = parseSearchText(title);
  try {
    const response = await axios.get(`${API_URL}/omdb/title/${parsedTitle}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMoviesFromSearchByID = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/omdb/id/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addMovieToLibrary = async (movie: AddToLibraryMovie) => {
  try {
    await axios.post(`${API_URL}/movies`, movie);
  } catch (error) {
    console.error(error);
  }
};

export const removeMovieFromLibrary = async (id: string) => {
  try {
    const movies = await getMoviesFromLibrary();
    const movie = movies.find((m: LibraryMovie) => m.imdb_id === id);
    await axios.delete(`${API_URL}/movies/${movie.id}`);
  } catch (error) {
    console.error(error);
  }
};

export const updateMovieFromLibrary = async (
  id: string,
  libraryMovie: AddToLibraryMovie,
) => {
  try {
    const movies = await getMoviesFromLibrary();
    const movie = movies.find((m: LibraryMovie) => m.imdb_id === id);
    await axios.patch(`${API_URL}/movies/${movie.id}`, libraryMovie);
  } catch (error) {
    console.error(error);
  }
};

export const getMovieFromLibrary = async (id: string) => {
  try {
    const movies = await getMoviesFromLibrary();
    const movie = movies.find((m: LibraryMovie) => m.imdb_id === id);
    return movie;
  } catch (error) {
    console.error(error);
  }
};
