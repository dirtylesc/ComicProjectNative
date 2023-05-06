/* eslint-disable react-native/no-inline-styles */
import {Image} from 'react-native';

import {colors} from 'res/colors';
import {HorizontalMenu, MenuItem} from 'Components/HorizontalMenu';

/* eslint-disable react/react-in-jsx-scope */
const FunctionBox = ({navigation}) => {
  return (
    <HorizontalMenu style={{padding: 5}} type="row">
      <MenuItem
        title="genre"
        icon={<Image source={require('res/images/adjust.png')} />}
        bgColor={colors.quaternary_lighter}
        size={20}
        style={{marginHorizontal: 27}}
        onPress={() => {
          navigation.navigate('Explore');
        }}
      />
      <MenuItem
        title="New"
        icon={<Image source={require('res/images/new.png')} />}
        bgColor={colors.negative_lighter}
        size={20}
        style={{marginHorizontal: 27}}
        onPress={() => {}}
      />
      <MenuItem
        title="Event"
        icon={<Image source={require('res/images/calendar.png')} />}
        bgColor={colors.primary_lighter}
        size={20}
        style={{marginHorizontal: 27}}
        onPress={() => {}}
      />
      <MenuItem
        title="Rank"
        icon={<Image source={require('res/images/rank.png')} />}
        bgColor={colors.tertiary_light}
        size={20}
        style={{marginHorizontal: 27}}
        onPress={() => {}}
      />
    </HorizontalMenu>
  );
};

export default FunctionBox;
