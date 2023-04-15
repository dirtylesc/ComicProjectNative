/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-shadow */
import {Image, Text, View} from 'react-native';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colors} from 'res/colors';
import styled from 'styled-components';
import WebView from 'react-native-webview';

export const renderRateStar = rate => {
  var arrRate = [];
  for (let index = 1; index <= rate; index++) {
    arrRate[index] = index;
  }
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 3}}>
      {arrRate.map(rate => (
        <FontAwesomeIcon
          key={rate}
          icon={faStar}
          size={14}
          color={colors.tertiary}
          style={{marginRight: 3}}
        />
      ))}
    </View>
  );
};

export const renderMessages = (messages, style) => {
  return (
    <WebView
      androidLayerType="software"
      showsVerticalScrollIndicator={false}
      originWhitelist={['*']}
      style={style}
      source={{
        html:
          '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>' +
          messages,
      }}
    />
  );
};

export const Heading = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 15px 40px 0 15px;
`;

export const MainContentView = styled(View)`
  margin: 0px 15px;
`;

export const ItemContentView = styled(View)`
  background-color: white;
  margin-top: 15px;
  border-radius: 20px;
  flex-direction: row;
  padding: 8px 0 0px 0;
`;

export const IconViewItem = styled(View)`
  border-radius: 15px;
  background-color: ${props => props.bgColor};
  padding: 10px;
`;

export const AvatarImage = styled(Image)`
  height: ${props => props.height + 'px'};
  width: ${props => (props.isHorizontal ? 60 + 'px' : 100 + '%')};
  border-radius: 3px;
`;

export const CenteredFlatListView = styled(View)`
  flex-direction: ${props => props.flexDirection};
  flex-basis: ${props => 100 / props.numColumns + '%'};
  padding: 0 8px;
  margin-bottom: 18px;
`;

export const ListItemTitle = styled(Text)`
  color: ${colors.large};
  width: ${props => (props.isHorizontal ? 180 + 'px' : 100 + '%')};
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.6px;
  padding-bottom: 5px;
`;
