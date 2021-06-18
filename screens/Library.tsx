import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Pressable,
} from 'react-native';
import {getMoviesFromLibrary} from '../utilities/requests';
import {AddToLibraryMovie} from '../utilities/types';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getMovies = async () => {
      setMovies(await getMoviesFromLibrary());
      console.log('running');
    };
    getMovies();
  }, [setMovies]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {movies.map((movie: AddToLibraryMovie) => (
          <Pressable
            style={styles.movie}
            onPress={async () =>
              navigation.navigate('AddToLibrary', {
                props: movie,
              })
            }>
            <View>
              <Image style={styles.cover} source={{uri: movie.info.cover}} />
              <Text style={styles.title}>{movie.info.title}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const coverWidth = 110;
const coverHeight = coverWidth * 1.5;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'purple',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cover: {
    height: coverHeight,
    borderRadius: 4,
    width: coverWidth,
  },
  movie: {
    backgroundColor: 'red',
    margin: 6,
    width: coverWidth,
  },
  title: {
    fontSize: 11,
    fontWeight: 'bold',
    maxWidth: '100%',
    textAlign: 'center',
  },
});

export default Home;
