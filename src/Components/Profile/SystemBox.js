/* eslint-disable react/react-in-jsx-scope */
import {faInbox, faGear} from '@fortawesome/free-solid-svg-icons';

import {colors} from 'res/colors';

import {ItemContentView} from 'Components';
import {
  HorizontalMenu,
  MenuSwitchItem,
  VerticalMenuItem,
} from 'Components/HorizontalMenu';

function SystemBox({navigation}) {
  return (
    <ItemContentView>
      <HorizontalMenu type="column">
        <MenuSwitchItem
          title="Night Mode"
          icon={faInbox}
          size={24}
          onPress={() => {
            navigation.navigate('Explore');
          }}
        />
        <VerticalMenuItem
          title="Settings"
          text="Notifications, language"
          leftIcon={faGear}
          size={24}
          color={colors.large}
          onPress={() => {
            navigation.navigate('Setting');
          }}
        />
        <VerticalMenuItem
          title="Settings"
          text="Notifications, language"
          leftIcon={faGear}
          size={24}
          color={colors.large}
          onPress={() => {
            navigation.navigate('Explore');
          }}
        />
        <VerticalMenuItem
          title="Settings"
          text="Notifications, language"
          leftIcon={faGear}
          size={24}
          color={colors.large}
          onPress={() => {
            navigation.navigate('Explore');
          }}
        />
        <VerticalMenuItem
          title="Settings"
          text="Notifications, language"
          leftIcon={faGear}
          size={24}
          color={colors.large}
          onPress={() => {
            navigation.navigate('Explore');
          }}
        />
      </HorizontalMenu>
    </ItemContentView>
  );
}

export default SystemBox;
