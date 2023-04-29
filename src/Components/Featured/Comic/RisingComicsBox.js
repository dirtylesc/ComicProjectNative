/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';

import {getComics} from 'helper/comics';
import {ItemContentView} from 'Components';
import FlatListCustom from 'Components/List/FlatListCustom';

function RisingComicsBox({navigation, refreshing}) {
  const [risingComicsData, setRisingComicsData] = useState([]);
  useEffect(() => {
    getComics(6, res => {
      setRisingComicsData(res);
    });
  }, [refreshing]);

  return (
    <ItemContentView>
      <FlatListCustom
        title="Rising Comics"
        data={risingComicsData}
        navigation={navigation}
        numColumns={3}
        listItemType="l"
      />
    </ItemContentView>
  );
}

export default RisingComicsBox;
