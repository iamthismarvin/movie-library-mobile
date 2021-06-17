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

const getStringFromNull = (value: string | null) => {
  return value === null ? '' : value;
};

const getNullFromEmpty = (value: string | null) => {
  return value === '' ? null : value;
};

const AddToLibrary = ({route}) => {
  const {props} = route.params;
  const [libraryMovie, setLibraryMovie] = useState<AddToLibraryMovie>({
    ...props,
  });

  const [isModalActive, setIsModalActive] = useState(false);
  const [isMovieInLibrary, setIsMovieInLibrary] = useState(true);

  const [notes, onChangeNotes] = useState<OptionalMovieField>(
    libraryMovie.notes,
  );
  const [purchaseLocation, onChangePurchaseLocation] =
    useState<OptionalMovieField>(libraryMovie.purchase_location);
  const [purchaseDate, setPurchaseDate] = useState<OptionalMovieField>(
    libraryMovie.purchased_at,
  );
  const [libraryID, onChangeLibraryID] = useState<OptionalMovieField>(
    libraryMovie.library_id,
  );
  const [formatHD, setFormatHD] = useState(libraryMovie.format.bluray_hd);
  const [formatUHD, setFormatUHD] = useState(libraryMovie.format.bluray_uhd);
  const [formatDigital, setFormatDigital] = useState(
    libraryMovie.format.digital,
  );
  const [formatDVD, setFormatDVD] = useState(libraryMovie.format.dvd);

  const cancel = () => {
    setFormatHD(libraryMovie.format.bluray_hd);
    setFormatUHD(libraryMovie.format.bluray_uhd);
    setFormatDigital(libraryMovie.format.digital);
    setFormatDVD(libraryMovie.format.dvd);
    onChangeNotes(libraryMovie.notes);
    onChangePurchaseLocation(libraryMovie.purchase_location);
    onChangeLibraryID(libraryMovie.library_id);
    setPurchaseDate(libraryMovie.purchased_at);
    setIsModalActive(false);
  };

  const clear = () => {
    setFormatHD(false);
    setFormatUHD(false);
    setFormatDigital(false);
    setFormatDVD(false);
    onChangeNotes(null);
    onChangePurchaseLocation(null);
    onChangeLibraryID(null);
    setPurchaseDate(null);

    setLibraryMovie({
      ...libraryMovie,
      notes: null,
      purchase_location: null,
      purchased_at: null,
      library_id: null,
      format: {
        bluray_hd: false,
        bluray_uhd: false,
        digital: false,
        dvd: false,
      },
    });

    setIsModalActive(false);
  };

  const save = async () => {
    const movie: AddToLibraryMovie = {
      purchased_at: getNullFromEmpty(purchaseDate),
      purchase_location: getNullFromEmpty(purchaseLocation),
      library_id: getNullFromEmpty(libraryID),
      imdb_id: libraryMovie.imdb_id,
      type: libraryMovie.type,
      notes: getNullFromEmpty(notes),
      info: {
        plot: libraryMovie.info.plot,
        year: libraryMovie.info.year,
        cover: libraryMovie.info.cover,
        genre: libraryMovie.info.genre,
        title: libraryMovie.info.title,
        actors: libraryMovie.info.actors,
        writer: libraryMovie.info.writer,
        director: libraryMovie.info.director,
        runtime: libraryMovie.info.runtime,
      },
      format: {
        bluray_hd: formatHD,
        bluray_uhd: formatUHD,
        digital: formatDigital,
        dvd: formatDVD,
      },
    };
    setLibraryMovie({...movie});
    await addMovieToLibrary(movie);
    setIsModalActive(false);
  };

  const removeFromLibrary = async () => {
    await removeMovieFromLibrary(libraryMovie.imdb_id);
    setIsModalActive(false);
    setIsMovieInLibrary(false);
    clear();
  };

  const findMovieInLibrary = async () => {
    const movies = await getMoviesFromLibrary();
    const result = movies.find(
      (movie: LibraryMovie) => movie.imdb_id === libraryMovie.imdb_id,
    )
      ? true
      : false;
    setIsMovieInLibrary(result);
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

  const MovieExtraInfo = () => {
    const getValueOrNA = (value: string | null) => {
      return value ? value : '(N/A)';
    };

    if (isMovieInLibrary) {
      return (
        <View>
          <Text style={styles.extraInfoTitle}>Library ID</Text>
          <Text>{getValueOrNA(libraryMovie.library_id)}</Text>
          <Text style={styles.extraInfoTitle}>Purchase Date</Text>
          <Text>{getValueOrNA(libraryMovie.purchased_at)}</Text>
          <Text style={styles.extraInfoTitle}>Purchase Location</Text>
          <Text>{getValueOrNA(libraryMovie.purchase_location)}</Text>
          <Text style={styles.extraInfoTitle}>Notes</Text>
          <Text>{getValueOrNA(libraryMovie.notes)}</Text>
          <Text style={styles.extraInfoTitle}>Format</Text>
          <View>
            <CheckboxWithText
              title="Blu-ray"
              value={libraryMovie.format.bluray_hd}
              isDisabled
            />
            <CheckboxWithText
              title="Blu-ray 4K"
              value={libraryMovie.format.bluray_uhd}
              isDisabled
            />
            <CheckboxWithText
              title="Digital"
              value={libraryMovie.format.digital}
              isDisabled
            />
            <CheckboxWithText
              title="DVD"
              value={libraryMovie.format.dvd}
              isDisabled
            />
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  };

  useEffect(() => {
    findMovieInLibrary();
  });

  return (
    <ScrollView keyboardShouldPersistTaps="never">
      <KeyboardAvoidingView>
        <View>
          <Image
            style={styles.poster}
            source={{uri: libraryMovie.info.cover}}
          />
          <View>
            <Text>{libraryMovie.info.title}</Text>
            <Text>{libraryMovie.info.year}</Text>
            <Text>{libraryMovie.info.runtime}</Text>
            <Text>{libraryMovie.type}</Text>
            <Text>{libraryMovie.imdb_id}</Text>
          </View>
        </View>
        <Text style={styles.plot}>{libraryMovie.info.plot}</Text>
        <MovieActionButtons />
        <CrewList title="Director" data={libraryMovie.info.director} />
        <CrewList title="Writer" data={libraryMovie.info.writer} />
        <CrewList title="Cast" data={libraryMovie.info.actors} />
        <MovieExtraInfo />
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
                value={getStringFromNull(libraryID)}
              />
              <Text>Purchase Date</Text>
              <TextInput
                style={styles.input}
                onChangeText={setPurchaseDate}
                value={getStringFromNull(purchaseDate)}
              />
              <Text>Purchase Location</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangePurchaseLocation}
                value={getStringFromNull(purchaseLocation)}
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
                value={getStringFromNull(notes)}
                numberOfLines={5}
                textAlignVertical="top"
              />
              <View style={styles.buttons}>
                <Button title="Cancel" onPress={() => cancel()} color="red" />
                <Button title="Save" onPress={() => save()} />
              </View>
            </View>
          </View>
        </Modal>
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
  extraInfoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddToLibrary;
