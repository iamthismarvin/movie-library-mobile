import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

const MovieListItem = ({
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
  <Pressable
    onPress={() => console.log(`Pressed on ${title}.`)}
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
      </View>
    </View>
  </Pressable>
);

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
