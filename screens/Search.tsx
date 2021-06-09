import axios from 'axios';
import React, {useState} from 'react';
import {SearchedMovie} from '../utilities/types';
import {StyleSheet, View, TextInput, FlatList, Button} from 'react-native';
import MovieListItem from '../components/MovieListItem';

const API_URL = 'http://10.0.2.2:3333';

// const getMoviesFromLibrary = async () => {
//   try {
//     MOVIES = await axios.get(`${API_URL}/movies/`);
//     // MOVIES = response;
//     console.log(MOVIES);
//   } catch (error) {
//     console.error(error);
//   }
// };

const parseSearchText = (text: string) => {
  return text.replace(/ /g, '+');
};

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, onChangeSearchValue] = useState('');

  const getMoviesFromSearch = async (title: string) => {
    const parsedTitle = parseSearchText(title);
    try {
      const response = await axios.get(`${API_URL}/search/${parsedTitle}`);
      setMovies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeSearchValue}
          value={searchValue}
        />
        <View style={styles.searchButton}>
          <Button
            onPress={() => getMoviesFromSearch(searchValue)}
            title="Search"
            color="#841584"
          />
        </View>
      </View>
      <FlatList
        style={styles.list}
        data={movies}
        renderItem={({item}: {item: SearchedMovie}) => (
          <MovieListItem
            title={item.Title}
            year={item.Year}
            poster={item.Poster}
            type={item.Type}
          />
        )}
        keyExtractor={movie => movie.imdbID}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    width: '100%',
  },
  input: {
    backgroundColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 12,
    width: '75%',
  },
  list: {
    width: '100%',
  },
  searchButton: {
    width: '20%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 12,
  },
});

export default Search;
