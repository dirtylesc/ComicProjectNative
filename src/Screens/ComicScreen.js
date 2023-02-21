/* eslint-disable react/react-in-jsx-scope */
import {ItemContentView, MainContentView} from '../Components';
import Menu from '../Components/Menu';
import MenuItem from '../Components/MenuItem';

import {faAdd} from '@fortawesome/free-solid-svg-icons';

const MenuFunc = ({navigation}) => {
  return (
    <Menu>
      <MenuItem
        title="genre"
        icon={faAdd}
        bgColor="#baf5e1"
        color="#baf5e1"
        size={20}
        onPress={() => {
          navigation.navigate('Explore');
        }}
      />
      <MenuItem
        title="New"
        icon={faAdd}
        bgColor="#ffc2d2"
        color="#baf5e1"
        size={20}
        onPress={() => {}}
      />
      <MenuItem
        title="Event"
        icon={faAdd}
        bgColor="#ffddc2"
        color="#baf5e1"
        size={20}
        onPress={() => {}}
      />
      <MenuItem
        title="Rank"
        icon={faAdd}
        bgColor="#eeeff9"
        color="#baf5e1"
        size={20}
        onPress={() => {}}
      />
    </Menu>
  );
};

function ComicScreen({navigation}) {
  return (
    <MainContentView>
      <ItemContentView>
        <MenuFunc navigation={navigation} />
      </ItemContentView>
    </MainContentView>
  );
}

export default ComicScreen;
