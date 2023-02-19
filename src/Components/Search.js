/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';

import {View, TextInput, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass, faGlobe} from '@fortawesome/free-solid-svg-icons';

function Search({width, ...inputProps}) {
  const [inputSearch, setInputSearch] = useState('');

  return (
    <View style={{width: width}}>
      <FontAwesomeIcon icon={faMagnifyingGlass} style={styled.icon} />
      <TextInput
        {...inputProps}
        style={styled.input}
        value={inputSearch}
        onChangeText={setInputSearch}
      />
    </View>
  );
}

const styled = StyleSheet.create({
  input: {
    paddingLeft: 40,
    paddingRight: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccccb3',
    borderRadius: 50,
    fontSize: 12,
    backgroundColor: 'white',
    height: 44,
  },
  icon: {
    position: 'absolute',
    color: '#262626',
    zIndex: 1,
    top: 15,
    left: 15,
  },
});

export default Search;
