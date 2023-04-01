import {Image, Text, View} from 'react-native';
import {colors} from 'res/colors';
import styled from 'styled-components';

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
