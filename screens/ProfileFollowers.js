import { Text, FlatList, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import FollowerCard from '../components/FollowerCard';

async function fetchData(usr) {
  const data = await fetch("https://api.github.com/users/"+usr+"/followers")
    .then((response) => response.json())
  return data;
}

function ProfileFollowers() {
  const [followers, setFollowers] = useState(null);
  const [hasFollowers, setHasFollowers] = useState(true);
  const route = useRoute();
  const usr = route.params.usr

  useEffect(() => {
    fetchData(usr).then((data) => {
      if(data.length===0){
        setHasFollowers(false)
      }
      else {
        setFollowers(data);
      }
    });
  }, [usr]);

  if (hasFollowers) {
    const navigation = useNavigation();
    return (
      <FlatList
        data={followers}
        renderItem={({item}) => 
          <FollowerCard
            username={item.login}
            navigation={navigation}
          />
        }
        keyExtractor={item => item.id}
      />
    );
  }
  else {
    return (
      <View style={styles.noFollowers}>
        <Text>Este perfil não tem seguidores</Text>
      </View>
    )
  }
}

export default ProfileFollowers;

const styles = StyleSheet.create({
  noFollowers: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});