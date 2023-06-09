import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import ProfileStackNavigator from './navigators/ProfileNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='auto'/>
      <ProfileStackNavigator/>
    </NavigationContainer>
    
  );
}