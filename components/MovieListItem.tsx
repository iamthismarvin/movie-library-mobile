import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  getMovieFromLibrary,
  getMoviesFromSearchByID,
} from '../utilities/requests';
import {AddToLibraryMovie} from '../utilities/types';

interface MovieListItemProps {
  title: string;
  year: number;
  poster: string;
  type: string;
  imdbID: string;
  inLibrary: boolean;
}

const getMovie = async (id: string) => {
  const libraryMovie = await getMovieFromLibrary(id);

  if (libraryMovie) {
    return libraryMovie;
  } else {
    const getArrayFromString = (list: string) => {
      return list.split(', ');
    };
    const apiMovie = await getMoviesFromSearchByID(id);
    const fmtMovie: AddToLibraryMovie = {
      purchased_at: null,
      purchase_location: null,
      library_id: null,
      imdb_id: apiMovie.imdbID,
      type: apiMovie.Type,
      notes: null,
      info: {
        plot: apiMovie.Plot,
        year: apiMovie.Year,
        cover: apiMovie.Poster,
        title: apiMovie.Title,
        runtime: apiMovie.Runtime,
        genre: getArrayFromString(apiMovie.Genre),
        director: getArrayFromString(apiMovie.Director),
        writer: getArrayFromString(apiMovie.Writer),
        actors: getArrayFromString(apiMovie.Actors),
      },
      format: {
        bluray_hd: false,
        bluray_uhd: false,
        digital: false,
        dvd: false,
      },
    };
    return fmtMovie;
  }
};

const MovieListItem = ({
  title,
  year,
  poster,
  type,
  imdbID,
  inLibrary,
}: MovieListItemProps) => {
  const navigation = useNavigation();

  const MovieInLibraryStatus = () => {
    if (inLibrary) {
      return <Text>In Library</Text>;
    } else {
      return <View />;
    }
  };

  return (
    <Pressable
      onPress={async () =>
        navigation.navigate('AddToLibrary', {
          props: await getMovie(imdbID),
        })
      }
      onLongPress={() => console.log(`Holding press on ${title}.`)}
      style={({pressed}) => [{backgroundColor: pressed ? 'red' : 'white'}]}>
      <View style={styles.container}>
        <Image
          style={styles.poster}
          source={{
            uri: `${poster}`,
          }}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text>{year}</Text>
          <Text>{type}</Text>
          <MovieInLibraryStatus />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    flex: 1,
    flexDirection: 'row',
    padding: 12,
  },
  content: {
    marginLeft: 16,
    maxWidth: '75%',
  },
  poster: {
    borderRadius: 2,
    height: 75,
    width: 50,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MovieListItem;
