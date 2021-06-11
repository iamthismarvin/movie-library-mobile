import React, {useState} from 'react';
import {
  Button,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Modal,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import CrewList from '../components/CrewList';
import CheckboxWithText from '../components/CheckboxWithText';
import {AddToLibraryMovie} from '../utilities/types';
import {addMovieToLibrary} from '../utilities/requests';

const getArrayFromString = (list: string) => {
  return list.split(', ');
};

const AddToLibrary = ({route}) => {
  const {props} = route.params;
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const [notes, onChangeNotes] = useState('');
  const [purchaseLocation, onChangePurchaseLocation] = useState('');
  const [libraryID, onChangeLibraryID] = useState('');
  const [formatHD, setFormatHD] = useState(false);
  const [formatUHD, setFormatUHD] = useState(false);
  const [formatDigital, setFormatDigital] = useState(false);
  const [formatDVD, setFormatDVD] = useState(false);

  const genres = getArrayFromString(props.Genre);
  const directors = getArrayFromString(props.Director);
  const writers = getArrayFromString(props.Writer);
  const actors = getArrayFromString(props.Actors);

  const cancel = () => {
    setFormatHD(false);
    setFormatUHD(false);
    setFormatDigital(false);
    setFormatDVD(false);
    setModalIsVisible(false);
    onChangeNotes('');
    onChangePurchaseLocation('');
    onChangeLibraryID('');
  };

  const save = async () => {
    const movie: AddToLibraryMovie = {
      purchased_at: null,
      library_id: libraryID,
      notes: notes,
      info: {
        plot: props.Plot,
        year: props.Year,
        cover: props.Poster,
        genre: genres,
        title: props.Title,
        actors: actors,
        writer: writers,
        director: directors,
        imdbID: props.imdbID,
        type: props.Type,
        runtime: props.Runtime,
      },
      format: {
        bluray_hd: formatHD,
        bluray_uhd: formatUHD,
        digital: formatDigital,
        dvd: formatDVD,
      },
    };
    await addMovieToLibrary(movie);
    setModalIsVisible(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="never">
      <KeyboardAvoidingView>
        <Modal
          transparent
          visible={modalIsVisible}
          onRequestClose={() => setModalIsVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
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
              <Text>Format</Text>
              <View>
                <CheckboxWithText
                  title="Blu-ray"
                  value={formatHD}
                  setFunction={setFormatHD}
                />
                <CheckboxWithText
                  title="Blu-ray 4K"
                  value={formatUHD}
                  setFunction={setFormatUHD}
                />
                <CheckboxWithText
                  title="Digital"
                  value={formatDigital}
                  setFunction={setFormatDigital}
                />
                <CheckboxWithText
                  title="DVD"
                  value={formatDVD}
                  setFunction={setFormatDVD}
                />
              </View>
              <Text>Notes</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeNotes}
                value={notes}
                numberOfLines={5}
                textAlignVertical="top"
              />
              <View style={styles.buttons}>
                <Button title="Cancel" onPress={() => cancel()} />
                <Button title="Add to Library" onPress={() => save()} />
              </View>
            </View>
          </View>
        </Modal>
        <Image style={styles.poster} source={{uri: props.Poster}} />
        <Text>{props.Title}</Text>
        <Text>{props.Year}</Text>
        <Text>{props.Runtime}</Text>
        <Text style={styles.plot}>{props.Plot}</Text>
        <Button
          onPress={() => setModalIsVisible(true)}
          title={'Add to Library'}
        />
        <CrewList title="Director" data={directors} />
        <CrewList title="Writer" data={writers} />
        <CrewList title="Cast" data={actors} />
        <Text>{props.Type}</Text>
        <Text>{props.imdbID}</Text>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
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
  modal: {
    backgroundColor: '#bbb',
    borderRadius: 12,
    padding: 24,
    width: '90%',
  },
  modalContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333aa',
  },
});

export default AddToLibrary;
