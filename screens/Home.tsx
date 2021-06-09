import React from 'react';
import {Button} from 'react-native';

const Home = ({navigation}) => {
  return (
    <Button title="Go to Search" onPress={() => navigation.push('Search')} />
  );
};

export default Home;
