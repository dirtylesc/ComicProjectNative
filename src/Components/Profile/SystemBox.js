/* eslint-disable react/react-in-jsx-scope */
import {
  faInbox,
  faGear,
  faCartShopping,
  faFileCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

import {colors} from 'res/colors';
import {HorizontalMenu, VerticalMenuItem} from 'Components/HorizontalMenu';
import {ItemContentView} from 'Components';

function SystemBox({navigation}) {
  return (
    <ItemContentView>
      <HorizontalMenu type="column">
        <VerticalMenuItem
          title="Night Mode"
          leftIcon={faInbox}
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
