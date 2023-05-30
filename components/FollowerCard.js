import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FollowerCard = props => {
  const { username, navigation } = props;
  return (
  <TouchableOpacity 
    style={styles.followerCard} 
    onPress={() => 
    navigation.navigate('Bio', {usr: username}
    )}>
      <View style={styles.usrLogin}>
        <Text>@{username}</Text>
      </View>
      <View style={styles.icon}>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </View>
  </TouchableOpacity>
  );
};

export default FollowerCard

const styles = StyleSheet.create({
    followerCard: {
      height: 60,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 25,
      backgroundColor: "#fff",
      flexDirection: "row"
    },
    usrLogin : {
      flex: 7,
      justifyContent: "center",
      alignItems: "center"
    },
    icon: {
      flex: 3,
      justifyContent: "center",
      alignItems: "center"
    }
  });