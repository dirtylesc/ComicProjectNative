/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {ScrollView, View} from 'react-native';

import {auth} from '../../firebaseConfig';
import {getUser} from 'helper/users';

import {MainContentView} from 'Components';
import {CustomerBox, ProfileHeader, SystemBox} from 'Components/Profile';
import {useEffect, useState} from 'react';

function ProfileScreen({navigation}) {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    if (auth.currentUser?.uid) {
      getUser(auth.currentUser.uid, res => {
        setUserInfo(res);
      });
    }
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainContentView>
        <View style={{marginBottom: 30}}>
          <ProfileHeader mainNavigation={navigation} userInfo={userInfo} />
          <View style={{marginTop: 30}}>
            <CustomerBox navigation={navigation} />
            <SystemBox navigation={navigation} />
          </View>
        </View>
      </MainContentView>
    </ScrollView>
  );
}

export default ProfileScreen;
