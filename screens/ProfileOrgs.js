import { Text, FlatList, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import OrgCard from '../components/OrgCard';

async function fetchData(usr) {
  const data = await fetch("https://api.github.com/users/"+usr+"/orgs")
    .then((response) => response.json())
  return data;
}

function ProfileOrgs() {
  const [orgs, setOrgs] = useState(null);
  const [hasOrgs, setHasOrgs] = useState(true);
  const route = useRoute();
  const usr = route.params.usr

  useEffect(() => {
    fetchData(usr).then((data) => {
      if(data.length===0){
        setHasOrgs(false)
      }
      else {
        setOrgs(data);
      }
    });
  }, [usr]);

  if (hasOrgs) {
    return (
      <FlatList
        data={orgs}
        renderItem={({item}) => 
          <OrgCard name ={item.login} />
        }
        keyExtractor={item => item.id}
      />
    );
  }
  else {
    return (
      <View style={styles.noOrgs}>
        <Text>Este perfil não faz parte de nenhuma organização</Text>
      </View>
    )
  }
}

export default ProfileOrgs;

const styles = StyleSheet.create({
  noOrgs: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});