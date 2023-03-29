/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Text} from 'react-native';

function TextCustom({text, size, color, style}) {
  return (
    <Text style={[{...style}, {fontSize: size, color: color}]}>{text}</Text>
  );
}

export default TextCustom;
