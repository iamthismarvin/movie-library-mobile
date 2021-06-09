import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {Button} from 'react-native';

const Home = () => {
  const navigation = useNavigation();

  return (
    <Button
      title="Go to Search"
      onPress={() => navigation.navigate('Search')}
    />
  );
};

export default Home;
