import {View} from 'react-native';
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
