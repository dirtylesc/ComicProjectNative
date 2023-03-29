/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {forwardRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import {colors} from 'res/colors';

const TextInputCustom = forwardRef(
  ({isInvalid = false, onChange = () => {}, style = {}, ...props}, ref) => {
    const [focus, setFocus] = useState(false);

    const handleChangeFocus = () => {
      if (focus) {
        setFocus(false);
      } else {
        setFocus(true);
      }
    };

    return (
      <View style={[{...style}]}>
        <TextInput
          ref={ref}
          onBlur={handleChangeFocus}
          onFocus={handleChangeFocus}
          onChangeText={onChange}
          style={[
            styles.input,
            focus
              ? {borderBottomColor: colors.primary}
              : {borderBottomColor: colors.border},
            isInvalid && {borderBottomColor: 'red'},
          ]}
          {...props}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  centeredView: {marginTop: 60},
  input: {
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  smallView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallText: {
    marginLeft: 8,
    fontSize: 12,
  },
});

export default TextInputCustom;
