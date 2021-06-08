import axios from 'axios';
import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Image,
  Button,
} from 'react-native';

const API_URL = 'http://10.0.2.2:3333';

interface LibraryMovie {
  id: 9;
  created_at: Date;
  updated_at: Date;
  purchased_at: Date;
  library_id: string;
  notes: string;
  info: {
    plot: string;
    year: number;
    cover: string;
    genre: string[];
    title: string;
    actors: string[];
    writer: string[];
    director: string[];
  };
}

// const getMoviesFromLibrary = async () => {
//   try {
//     MOVIES = await axios.get(`${API_URL}/movies/`);
//     // MOVIES = response;
//     console.log(MOVIES);
//   } catch (error) {
//     console.error(error);
//   }
// };

interface SearchedMovie {
  Title: string;
  Year: number;
  imdbID: string;
  Type: string;
  Poster: string;
}

const parseSearchText = (text: string) => {
  return text.replace(/ /g, '+');
};

const Movie = ({
  title,
  year,
  poster,
  type,
}: {
  title: string;
  year: number;
  poster: string;
  type: string;
}) => (
  <View style={styles.itemContainer}>
    <Image
      style={styles.itemImage}
      source={{
        uri: `${poster}`,
      }}
    />
    <View style={styles.itemTextContainer}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text>{year}</Text>
      <Text>{type}</Text>
    </View>
  </View>
);

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
        <Text style={styles.title}>Search</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeSearchValue}
          value={searchValue}
        />
        <Button
          onPress={() => getMoviesFromSearch(searchValue)}
          title="Search"
          color="#841584"
        />
      </View>
      <FlatList
        style={styles.list}
        data={movies}
        renderItem={({item}: {item: SearchedMovie}) => (
          <Movie
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
    padding: 12,
    width: '100%',
  },
  input: {
    backgroundColor: '#ddd',
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 12,
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 12,
  },
  itemContainer: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    height: 100,
    flex: 1,
    flexDirection: 'row',
    padding: 12,
  },
  itemGenre: {
    backgroundColor: 'lightblue',
    marginRight: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  itemGenreSection: {
    flexDirection: 'row',
  },
  itemTextContainer: {
    marginLeft: 12,
  },
  itemImage: {
    height: 75,
    width: 50,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
  },
});

export default Search;
