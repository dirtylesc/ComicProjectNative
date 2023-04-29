/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {ref, getStorage, getDownloadURL} from 'firebase/storage';

import {colors} from 'res/colors';
import {calculateHeightImage, getColorRankedNumber} from 'helper/helper';

import {
  AvatarImage,
  CenteredFlatListView,
  ListItemTitle,
  RankedNumber,
} from 'Components';

function RankedListItem({
  index,
  title,
  avatarUri,
  text,
  type = 'l',
  numColumns,
  isHorizontal = false,
  onPress,
}) {
  const [url, setUrl] = useState();

  useEffect(() => {
    const func = async () => {
      const storage = getStorage();
      const imageRef = ref(storage, `/comic_images/${avatarUri}`);

      await getDownloadURL(imageRef).then(x => {
        setUrl(x);
      });
    };

    if (url === undefined) {
      func();
    }
  }, [avatarUri, url]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <CenteredFlatListView
        numColumns={numColumns}
        flexDirection={isHorizontal ? 'row' : 'column'}>
        <AvatarImage
          height={calculateHeightImage(type)}
          isHorizontal={isHorizontal}
          source={{uri: url}}
          resizeMode="cover"
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}>
          <RankedNumber
            isHorizontal={isHorizontal}
            color={getColorRankedNumber(index)}>
            {index}
          </RankedNumber>
          <View>
            <ListItemTitle numberOfLines={2} isHorizontal={isHorizontal}>
              {title}
            </ListItemTitle>
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      </CenteredFlatListView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.medium,
    fontWeight: '400',
    fontSize: 14,
    letterSpacing: 0.6,
  },
});

export default RankedListItem;
