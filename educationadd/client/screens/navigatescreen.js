import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';


import Profile from './profile';
import Education from './education';



const Navigatscreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Education', title: 'Education', focusedIcon: 'file-document' },
    // { key: 'Skills', title: 'Skills', focusedIcon: 'file-document' },
    // { key: 'Experience', title: 'Experience', focusedIcon: 'file-document' },
    { key: 'profile', title: 'Profile', focusedIcon: 'home-account',unfocusedIcon: 'home-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    // home: Home,
    profile: Profile,
    Education: Education,
    // Skills:Skills,
    // Experience:Experience
  });

  return (
    <BottomNavigation 
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Navigatscreen;