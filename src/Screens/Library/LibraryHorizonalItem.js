/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Image,
  View,
  Platform,
} from 'react-native';
import {ref, getStorage, getDownloadURL} from 'firebase/storage';

import {CenteredFlatListView} from 'Components';
import {getComicWithChapters} from 'helper/comics';
import TouchIcon from 'Components/TouchIcon';
import BottomPopup from 'Components/BottomPopup';
import ItemBottomPopup from 'Components/ItemBottomPopup';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEllipsis,
  faFileCircleCheck,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import {colors} from 'res/colors';
import {removeComicFromLibrary} from 'helper/libraries';
import AlertConfirmCustom from 'Components/AlertConfirmCustom';
import {auth} from '../../../firebaseConfig';

function LibraryHorizonalItem({
  id,
  comicId,
  chapterId,
  onPressChapter,
  onPressComic,
  onRefresh,
}) {
  const [data, setData] = useState();
  const [url, setUrl] = useState();

  const deletionRef = useRef();
  const popupRef = useRef();

  const openPopup = () => {
    popupRef.current.show();
  };

  useEffect(() => {
    getComicWithChapters(comicId, chapterId, res => {
      setData(res);
    });
  }, [chapterId, comicId]);

  useEffect(() => {
    const func = async () => {
      const storage = getStorage();
      const imageRef = ref(storage, `/comic_images/${data.avatar}`);

      await getDownloadURL(imageRef).then(x => {
        setUrl(x);
      });
    };

    if (url === undefined && data?.avatar) {
      func();
    }
  }, [data, url]);

  const handleShowDeletionModal = () => {
    deletionRef.current.show();
    popupRef.current.close();
  };

  const handleRemoveFromLibrary = () => {
    const isSuccess = removeComicFromLibrary(auth.currentUser?.uid, id);
    deletionRef.current.close();
    if (isSuccess) {
      onRefresh();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onPressChapter}>
      <CenteredFlatListView
        numColumns={3}
        flexDirection={'column'}
        pd="5px 14px"
        mb="0">
        <Image source={{uri: url}} resizeMode="cover" style={styles.avatar} />
        <Text style={styles.title} numberOfLines={2}>
          {data?.name}
        </Text>
        <View style={styles.funcView}>
          <Text style={styles.text}>
            {data?.currentChapter?.number || 0}/{data?.chaptersCount}
          </Text>
          <TouchableWithoutFeedback onPress={openPopup}>
            <View>
              <FontAwesomeIcon
                icon={faEllipsis}
                size={18}
                color={colors.white}
              />
            </View>
          </TouchableWithoutFeedback>
          <BottomPopup ref={popupRef}>
            <ItemBottomPopup
              icon={faTrashCan}
              text="Remove from library"
              onPress={handleShowDeletionModal}
            />
            <ItemBottomPopup
              icon={faFileCircleCheck}
              text="About Comic"
              onPress={onPressComic}
            />
          </BottomPopup>
          <AlertConfirmCustom
            title="Remove this comic out of the Library?"
            cancelText="cancel"
            submitText="remove"
            onPressCancel={() => {
              deletionRef.current.close();
            }}
            onPressSubmit={() => {
              handleRemoveFromLibrary();
            }}
            ref={deletionRef}
          />
        </View>
      </CenteredFlatListView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 110,
    height: 150,
  },
  title: {
    flex: 1,
    marginTop: 8,
    width: 110,
  },
  funcView: {
    position: 'absolute',
    right: '13%',
    bottom: '27%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    paddingHorizontal: 7,
    height: 20,
  },
  text: {
    color: colors.white,
    fontWeight: '400',
    fontSize: 13,
    letterSpacing: 0.6,
  },
});

export default LibraryHorizonalItem;
