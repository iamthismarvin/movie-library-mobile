import React, {useState} from 'react';
import {SearchedMovie} from '../utilities/types';
import {StyleSheet, View, TextInput, FlatList, Button} from 'react-native';
import {getMoviesFromSearchByTitle} from '../utilities/requests';
import MovieListItem from '../components/MovieListItem';

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, onChangeSearchValue] = useState('');

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
            onPress={async () => {
              setMovies(await getMoviesFromSearchByTitle(searchValue));
            }}
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
            imdbID={item.imdbID}
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
