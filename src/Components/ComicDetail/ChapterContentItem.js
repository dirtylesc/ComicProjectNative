/* eslint-disable react/react-in-jsx-scope */
import {getChapterNumber} from 'helper/helper';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

function ChapterContentItem({data, number, comicId, navigation}) {
  const handleGoToChapterScreen = () => {
    navigation.navigate('Chapter', {
      comicId: comicId,
      chapterId: data.id,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleGoToChapterScreen}>
      <View style={[styles.centeredView, styles.flex]}>
        <Text style={styles.text}>{number + 1}</Text>
        <View style={[styles.infoBox, styles.flex]}>
          <Text style={[styles.number, styles.text]}>
            {getChapterNumber(data.number)}
          </Text>
          <Text style={styles.text}>{data.title}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  centeredView: {flex: 1, padding: 20},
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoBox: {
    marginLeft: 35,
  },
  text: {
    fontSize: 16,
    letterSpacing: 0.5,
  },
  number: {
    width: 35,
  },
});

export default ChapterContentItem;
