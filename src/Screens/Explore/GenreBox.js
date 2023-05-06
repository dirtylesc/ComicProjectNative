/* eslint-disable react/react-in-jsx-scope */
import {MenuItem} from 'Components/HorizontalMenu';
import {getDownloadURL, getStorage, ref} from 'firebase/storage';
import {getAllCategories} from 'helper/categories';
import {getImage} from 'helper/storage';
import {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Image, Dimensions} from 'react-native';
import {colors} from 'res/colors';

const window = Dimensions.get('window');

function GenreBox({navigation}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllCategories(res => setData(res));
  }, []);

  const renderCategories = () => {
    if (data) {
      return data.map(item => (
        <MenuItem
          key={item.slug}
          type="row"
          title={item.name}
          textTransform="none"
          icon={<Image style={styles.image} source={{uri: item.image}} />}
          fs={14}
          style={styles.menuItem}
          onPress={() => {}}
        />
      ));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.centeredView}>
      {renderCategories()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10},
  menuItem: {
    width: (window.width - window.width / 4) / 2 - 30,
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 10,
    backgroundColor: colors.small,
    borderRadius: 10,
  },
  image: {
    borderRadius: 3,
    width: 33,
    height: 48,
  },
});

export default GenreBox;
