import { createStackNavigator } from '@react-navigation/stack';
import ProfileBio from "../screens/ProfileBio"
import ProfileRepos from '../screens/ProfileRepos';
import ProfileOrgs from '../screens/ProfileOrgs';
import ProfileFollowers from '../screens/ProfileFollowers';
import ProfileScreen from '../screens/Profile';

const Stack = createStackNavigator();

function ProfileStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Perfil" component={ProfileScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Bio" component={ProfileBio} />
      <Stack.Screen name="Orgs" component={ProfileOrgs} />
      <Stack.Screen name="Repositórios" component={ProfileRepos} />
      <Stack.Screen name="Seguidores" component={ProfileFollowers} />
    </Stack.Navigator>
  );
}

export default ProfileStackNavigator;