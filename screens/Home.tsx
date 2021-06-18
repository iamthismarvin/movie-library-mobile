import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {Button, View} from 'react-native';

const Home = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Button
        title="Go to Search"
        onPress={() => navigation.navigate('Search')}
      />
      <Button
        title="Go to Library"
        onPress={() => navigation.navigate('Library')}
      />
    </View>
  );
};

export default Home;
