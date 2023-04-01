/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRepeat} from '@fortawesome/free-solid-svg-icons';

import {colors} from 'res/colors';

import RankedListItem from './RankedListItem';
import {chunkify} from 'helper/helper';

function RankedFlatList({
  title,
  smallText,
  data,
  isHorizontal = false,
  onPressForRandom,
  numColumns,
  ...props
}) {
  const childsData = chunkify(data, 5);

  const renderFlatList = () => {
    let i = 0;
    return childsData.map((child, key) => {
      return (
        <FlatList
          key={key}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          contentContainerStyle={{
            alignSelf: 'flex-start',
          }}
          data={child}
          renderItem={({item, index}) => (
            <RankedListItem
              index={++i}
              title={item.name}
              avatarUri={item.avatar}
              text={item.categories[0][1]}
              numColumns={numColumns}
              isHorizontal={isHorizontal}
              type={props.listItemType}
            />
          )}
          keyExtractor={item => item.id}
          style={styles.list}
        />
      );
    });
  };

  const renderScrollList = () => {
    return (
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {renderFlatList()}
      </ScrollView>
    );
  };

  return (
    <View style={styles.centeredView}>
      {isHorizontal ? renderScrollList() : renderFlatList()}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 15,
  },
  title: {
    paddingLeft: 8,
    fontSize: 22,
    fontWeight: '500',
    letterSpacing: 0.6,
    color: colors.large,
    textTransform: 'capitalize',
  },
  smallText: {
    paddingLeft: 8,
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.6,
    color: colors.medium,
  },
  list: {
    marginTop: 15,
  },
});

export default RankedFlatList;
