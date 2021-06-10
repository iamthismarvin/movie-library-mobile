import React, {useState} from 'react';
import {
  Button,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import CrewList from '../components/CrewList';

const getArrayFromString = (list: string) => {
  return list.split(', ');
};

const AddToLibrary = ({route}) => {
  const {props} = route.params;

  const [notes, onChangeNotes] = useState('');
  const [purchaseLocation, onChangePurchaseLocation] = useState('');
  const [libraryID, onChangeLibraryID] = useState('');

  const directors = getArrayFromString(props.Director);
  const writers = getArrayFromString(props.Writer);
  const actors = getArrayFromString(props.Actors);

  return (
    <ScrollView keyboardShouldPersistTaps="never">
      <KeyboardAvoidingView>
        <Image style={styles.poster} source={{uri: props.Poster}} />
        <Text>{props.Title}</Text>
        <Text>{props.Year}</Text>
        <Text>{props.Runtime}</Text>
        <Text style={styles.plot}>{props.Plot}</Text>
        <Button
          onPress={() => console.log(`Add ${props.Title} to library.`)}
          title={'Add to Library'}
        />
        <CrewList title="Director" data={directors} />
        <CrewList title="Writer" data={writers} />
        <CrewList title="Cast" data={actors} />
        <Text>{props.Type}</Text>
        <Text>{props.imdbID}</Text>
        <Text>Library ID</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeLibraryID}
          value={libraryID}
        />
        <Text>Purchase Location</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePurchaseLocation}
          value={purchaseLocation}
        />
        <Text>Notes</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNotes}
          value={notes}
          numberOfLines={5}
          textAlignVertical="top"
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#ddd',
  },
  plot: {
    padding: 12,
    fontStyle: 'italic',
  },
  poster: {
    height: 150,
    width: 100,
  },
});

export default AddToLibrary;
