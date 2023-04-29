/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TouchableWithoutFeedback, View} from 'react-native';

function TouchIcon({onPress, hidden = true, viewStyle, ...iconProps}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[viewStyle, hidden && {display: 'none'}]}>
        <FontAwesomeIcon {...iconProps} />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default TouchIcon;
