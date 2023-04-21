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

function CustomerBox({navigation}) {
  return (
    <ItemContentView>
      <HorizontalMenu type="column">
        <VerticalMenuItem
          title="Inbox"
          leftIcon={faInbox}
          size={24}
          onPress={() => {
            navigation.navigate('Explore');
          }}
        />
        <VerticalMenuItem
          title="My Gear"
          text="View and manage themes sets, backgrounds"
          leftIcon={faGear}
          size={24}
          color={colors.large}
          onPress={() => {
            navigation.navigate('Explore');
          }}
        />
        <VerticalMenuItem
          title="Purcharse History"
          leftIcon={faCartShopping}
          size={24}
          color={colors.large}
          onPress={() => {
            navigation.navigate('Explore');
          }}
        />
        <VerticalMenuItem
          title="Viewed"
          leftIcon={faFileCircleCheck}
          size={24}
          color={colors.large}
          onPress={() => {
            navigation.navigate('History');
          }}
        />
      </HorizontalMenu>
    </ItemContentView>
  );
}

export default CustomerBox;
