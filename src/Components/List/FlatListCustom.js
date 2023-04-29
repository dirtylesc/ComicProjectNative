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

import ListItem from './ListItem';

function FlatListCustom({
  title,
  smallText,
  isSearch = false,
  data,
  isHorizontal = false,
  onPressForRandom,
  numColumns,
  navigation,
  ...props
}) {
  const handleNavigate = itemId => {
    navigation.navigate('ComicDetail', {
      id: itemId,
    });
  };

  const renderFlatList = () => {
    return (
      <FlatList
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        numColumns={numColumns}
        data={data}
        renderItem={({item}) => (
          <ListItem
            title={item.name}
            isSearch={isSearch}
            avatarUri={item.avatar}
            text={isSearch ? item.author : item.categories[0][1]}
            numColumns={numColumns}
            isHorizontal={isHorizontal}
            type={props.listItemType}
            onPress={() => handleNavigate(item.id)}
          />
        )}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    );
  };

  const renderScrollList = () => {
    return (
      <ScrollView
        horizontal={title && true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {renderFlatList()}
      </ScrollView>
    );
  };

  const renderTitle = () => {
    if (onPressForRandom) {
      return (
        <View style={[styles.flexRowView, {justifyContent: 'space-between'}]}>
          <Text style={styles.title}>{title}</Text>
          <TouchableWithoutFeedback onPress={onPressForRandom}>
            <View style={styles.flexRowView}>
              <FontAwesomeIcon
                icon={faRepeat}
                color={colors.primary}
                size={16}
              />
              <Text style={styles.switchText}>Switch</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    } else {
      return <Text style={styles.title}>{title}</Text>;
    }
  };

  return (
    <View style={styles.centeredView}>
      {title && renderTitle()}
      {smallText && <Text style={styles.smallText}>{smallText}</Text>}
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
  flexRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
  },
  switchText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
    paddingLeft: 5,
  },
});

export default FlatListCustom;
