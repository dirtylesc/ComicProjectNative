/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {auth} from '../../firebaseConfig';
import {getUser} from 'helper/users';
import {MainContentView} from 'Components';
import {CustomerBox, ProfileHeader, SystemBox} from 'Components/Profile';

function ProfileScreen({navigation}) {
  const userInfo = getUser(auth.currentUser?.uid);

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
