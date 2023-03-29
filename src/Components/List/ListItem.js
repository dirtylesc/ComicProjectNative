/* eslint-disable react/self-closing-comp */
/* eslint-disable react/react-in-jsx-scope */
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
import {useEffect, useState} from 'react';

const CenteredView = styled(View)`
  flex-direction: ${props => props.flexDirection};
  flex-basis: ${props => 100 / props.numColumns + '%'};
  padding: 0 8px;
  margin-bottom: 18px;
`;

const BoxView = styled(View)`
  margin-left: ${props => (props.isHorizontal ? '12px' : '0')};
`;

const AvatarImage = styled(Image)`
  height: ${props => props.height + 'px'};
  width: ${props => (props.isHorizontal ? 60 + 'px' : 100 + '%')};
  border-radius: 3px;
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
}) {
  const [url, setUrl] = useState();

  useEffect(() => {
    const func = async () => {
      const storage = getStorage();
      const imageRef = ref(storage, '/comic_images/' + avatarUri);

      await getDownloadURL(imageRef).then(x => {
        setUrl(x);
      });
    };

    if (url === undefined) {
      func();
    }
  }, [avatarUri, url]);

  const calculateHeightImage = () => {
    switch (type) {
      case 'l':
        return 130;
      case 'm':
        return 100;
      case 's':
        return 80;
      default:
        return 85;
    }
  };

  return (
    <TouchableWithoutFeedback>
      <CenteredView
        numColumns={numColumns}
        flexDirection={isHorizontal ? 'row' : 'column'}>
        <AvatarImage
          height={calculateHeightImage()}
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
