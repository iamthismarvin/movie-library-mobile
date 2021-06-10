import axios from 'axios';

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
