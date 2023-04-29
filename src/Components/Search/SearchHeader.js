/* eslint-disable react/react-in-jsx-scope */
import {TouchableWithoutFeedback, StyleSheet, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import {colors} from 'res/colors';
import {Heading} from 'Components';
import SearchBox from 'Components/SearchBox';

function SearchHeader({navigation, onChangeSearch}) {
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.centeredView, {marginBottom: insets.bottom}]}>
      <Heading>
        <TouchableWithoutFeedback onPress={handleBack}>
          <View style={styles.onBackIcon}>
            <FontAwesomeIcon icon={faArrowLeft} size={24} />
          </View>
        </TouchableWithoutFeedback>
        <SearchBox
          width="100%"
          placeholder="Search for stories"
          onChange={onChangeSearch}
        />
      </Heading>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    marginTop: 10,
    borderBottomColor: colors.border,
    borderBottomWidth: 0.6,
    paddingBottom: 45,
  },
  onBackIcon: {
    padding: 5,
    width: 50,
  },
});

export default SearchHeader;
