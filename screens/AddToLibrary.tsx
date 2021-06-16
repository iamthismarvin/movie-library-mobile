import React, {useEffect, useState} from 'react';
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
import {
  AddToLibraryMovie,
  LibraryMovie,
  OptionalMovieField,
} from '../utilities/types';
import {
  addMovieToLibrary,
  getMoviesFromLibrary,
  removeMovieFromLibrary,
} from '../utilities/requests';

const getArrayFromString = (list: string) => {
  return list.split(', ');
};

const AddToLibrary = ({route}) => {
  const {props} = route.params;
  const [isModalActive, setIsModalActive] = useState(false);
  const [isMovieInLibrary, setIsMovieInLibrary] = useState(true);

  const [notes, onChangeNotes] = useState<OptionalMovieField>('');
  const [purchaseLocation, onChangePurchaseLocation] =
    useState<OptionalMovieField>('');
  const [libraryID, onChangeLibraryID] = useState<OptionalMovieField>('');
  const [formatHD, setFormatHD] = useState(false);
  const [formatUHD, setFormatUHD] = useState(false);
  const [formatDigital, setFormatDigital] = useState(false);
  const [formatDVD, setFormatDVD] = useState(false);

  const genres = getArrayFromString(props.Genre);
  const directors = getArrayFromString(props.Director);
  const writers = getArrayFromString(props.Writer);
  const actors = getArrayFromString(props.Actors);

  const clear = () => {
    setFormatHD(false);
    setFormatUHD(false);
    setFormatDigital(false);
    setFormatDVD(false);
    setIsModalActive(false);
    onChangeNotes('');
    onChangePurchaseLocation('');
    onChangeLibraryID('');
  };

  const save = async () => {
    const movie: AddToLibraryMovie = {
      purchased_at: '2021-09-09',
      purchase_location: purchaseLocation,
      library_id: libraryID,
      imdb_id: props.imdbID,
      type: props.Type,
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
    setIsModalActive(false);
  };

  const removeFromLibrary = async () => {
    await removeMovieFromLibrary(props.imdbID);
    setIsModalActive(false);
    setIsMovieInLibrary(false);
  };

  const findMovieInLibrary = async () => {
    const movies = await getMoviesFromLibrary();
    const result = movies.find(
      (movie: LibraryMovie) => movie.imdb_id === props.imdbID,
    )
      ? true
      : false;
    setIsMovieInLibrary(result);
  };

  const AddToLibraryModal = () => {
    return (
      <Modal
        transparent
        visible={isModalActive}
        onRequestClose={() => setIsModalActive(false)}>
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
              <Button title="Cancel" onPress={() => clear()} />
              <Button title="Add to Library" onPress={() => save()} />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const MovieActionButtons = () => {
    if (!isMovieInLibrary) {
      return (
        <Button
          onPress={() => setIsModalActive(true)}
          title={'Add to Library'}
        />
      );
    } else {
      return (
        <View>
          <Button
            onPress={() => setIsModalActive(true)}
            title={'Edit'}
            color="purple"
          />
          <Button
            onPress={() => removeFromLibrary()}
            title={'Remove from Library'}
            color="red"
          />
        </View>
      );
    }
  };

  useEffect(() => {
    findMovieInLibrary();
  });

  return (
    <ScrollView keyboardShouldPersistTaps="never">
      <KeyboardAvoidingView>
        <AddToLibraryModal />
        <View>
          <Image style={styles.poster} source={{uri: props.Poster}} />
          <View>
            <Text>{props.Title}</Text>
            <Text>{props.Year}</Text>
            <Text>{props.Runtime}</Text>
          </View>
        </View>
        <Text style={styles.plot}>{props.Plot}</Text>
        <MovieActionButtons />
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
