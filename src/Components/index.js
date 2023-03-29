import {View} from 'react-native';
import styled from 'styled-components';

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
