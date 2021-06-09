import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface MovieListItemProps {
  title: string;
  year: number;
  poster: string;
  type: string;
  imdbID: string;
}

const MovieListItem = (props: MovieListItemProps) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('AddToLibrary', {props})}
      onLongPress={() => console.log(`Holding press on ${props.title}.`)}
      style={({pressed}) => [{backgroundColor: pressed ? 'red' : 'white'}]}>
      <View style={styles.container}>
        <Image
          style={styles.poster}
          source={{
            uri: `${props.poster}`,
          }}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{props.title}</Text>
          <Text>{props.year}</Text>
          <Text>{props.type}</Text>
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
