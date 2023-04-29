/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass, faXmark} from '@fortawesome/free-solid-svg-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from 'res/colors';
import {getPositionFromStorageItems} from 'helper/helper';
import TouchIcon from './TouchIcon';

function SearchBox({width, onChange = () => {}, ...inputProps}) {
  const [inputSearch, setInputSearch] = useState('');

  useEffect(() => {
    onChange(inputSearch);
  }, [inputSearch, onChange]);

  const handleStoreHistory = async () => {
    try {
      var items = await AsyncStorage.getItem('searchHistories');
      if (!items) {
        items = [];
      } else {
        items = JSON.parse(items);
      }

      const position = getPositionFromStorageItems(items, inputSearch);
      if (position >= 0) {
        items.array.splice(position, 1);
      }

      items.unshift(inputSearch);
      await AsyncStorage.setItem('searchHistories', JSON.stringify(items));
    } catch (e) {
      // saving error
    }
  };

  const handleClearText = () => {
    setInputSearch('');
  };

  return (
    <View width={width} style={{paddingRight: 25}}>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        style={[styles.icon, styles.glassIcon]}
      />
      <TextInput
        {...inputProps}
        style={styles.input}
        value={inputSearch}
        onChangeText={setInputSearch}
        onSubmitEditing={handleStoreHistory}
      />
      <TouchIcon
        onPress={handleClearText}
        hidden={inputSearch === ''}
        viewStyle={[styles.icon, styles.xmarkIcon]}
        icon={faXmark}
        color={colors.medium}
        size={18}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingLeft: 40,
    paddingRight: 45,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccccb3',
    borderRadius: 50,
    fontSize: 13,
    backgroundColor: 'white',
    height: 44,
    fontWeight: '400',
    letterSpacing: 0.6,
    color: colors.medium,
  },
  icon: {
    position: 'absolute',
    color: '#262626',
    zIndex: 1,
  },
  glassIcon: {
    top: 15,
    left: 15,
  },
  xmarkIcon: {
    top: 13,
    right: 45,
  },
});

export default SearchBox;
