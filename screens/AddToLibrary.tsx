import React from 'react';
import {Text} from 'react-native';

const AddToLibrary = ({route}) => {
  const {props} = route.params;

  return (
    <Text>
      Adding {props.title} with IMDB ID: {props.imdbID} to Library.
    </Text>
  );
};

export default AddToLibrary;
