/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styled from 'styled-components';

import {ref, getStorage, getDownloadURL} from 'firebase/storage';

import {colors} from 'res/colors';
import {calculateHeightImage} from 'helper/helper';
import {AvatarImage} from 'Components';

const CenteredView = styled(View)`
  flex-direction: ${props => props.flexDirection};
  flex-basis: ${props => 100 / props.numColumns + '%'};
  padding: 0 8px;
  margin-bottom: 18px;
`;

const BoxView = styled(View)`
  margin-left: ${props => (props.isHorizontal ? '12px' : '0')};
`;

const Title = styled(Text)`
  color: ${colors.large};
  width: ${props => (props.isHorizontal ? 180 + 'px' : 100 + '%')};
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.6px;
  padding-top: 8px;
  padding-bottom: 5px;
`;

function ListItem({
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
      <CenteredView
        numColumns={numColumns}
        flexDirection={isHorizontal ? 'row' : 'column'}>
        <AvatarImage
          height={calculateHeightImage(type)}
          isHorizontal={isHorizontal}
          source={{uri: url}}
          resizeMode="cover"
        />
        <BoxView isHorizontal={isHorizontal}>
          <Title numberOfLines={2} isHorizontal={isHorizontal}>
            {title}
          </Title>
          <Text style={styles.text}>{text}</Text>
        </BoxView>
      </CenteredView>
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

export default ListItem;
