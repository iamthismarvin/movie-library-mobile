import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface CrewListProps {
  title: string;
  data: string[];
}

const CrewList = ({title, data}: CrewListProps) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      {data.map(item => (
        <Text key={data.indexOf(item)}>{item}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CrewList;
