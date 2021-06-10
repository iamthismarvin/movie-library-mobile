import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

interface CrewListProps {
  title: string;
  data: string[];
}

const CrewList = ({title, data}: CrewListProps) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        renderItem={({item}) => <Text>{item}</Text>}
        keyExtractor={item => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {fontWeight: 'bold', fontSize: 16},
});

export default CrewList;
