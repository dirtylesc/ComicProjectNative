/* eslint-disable react/react-in-jsx-scope */
import {RankedNumber} from 'Components';
import {getColorRankedNumber} from 'helper/helper';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {colors} from 'res/colors';

function TopBox({title, data, navigation}) {
  const handleNavigate = item => {
    navigation.navigate('ComicDetail', {
      id: item.id,
    });
  };

  const renderContent = (item, index) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => handleNavigate(item)}
        key={item.name}>
        <View style={[styles.flex, styles.topEle]}>
          <RankedNumber color={getColorRankedNumber(index + 1)}>
            {index + 1}
          </RankedNumber>
          <Text style={styles.topEleText} numberOfLines={2}>
            {item.name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderContents = () => {
    if (data) {
      if (data.length > 1) {
        return data.map((item, index) => {
          return renderContent(item, index);
        });
      } else {
        return renderContent(data[0], 0);
      }
    }
  };

  return (
    <View style={styles.centeredView}>
      <ImageBackground
        source={require('res/images/bgTop.jpg')}
        imageStyle={styles.bgImage}
        style={styles.bgTitle}>
        <Text style={styles.title}>{title}</Text>
      </ImageBackground>
      <View style={styles.topBox}>{renderContents()}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginRight: 20,
    width: 330,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bgImage: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    opacity: 0.8,
  },
  bgTitle: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0.6,
  },
  topBox: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingVertical: 10,
    minHeight: 500,
  },
  topEle: {
    paddingLeft: 15,
    paddingRight: 20,
    paddingVertical: 12,
  },
  topEleText: {
    flex: 1,
    paddingLeft: 20,
    fontSize: 16,
    fontWeight: '400',
    color: colors.large,
    letterSpacing: 0.6,
  },
});

export default TopBox;
