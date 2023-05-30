import { Text, FlatList, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import RepoCard from '../components/RepoCard';

async function fetchData(usr) {
  const data = await fetch("https://api.github.com/users/"+usr+"/repos")
    .then((response) => response.json())
  return data;
}

function ProfileRepos() {
  const [repos, setRepos] = useState(null);
  const [hasRepos, setHasRepos] = useState(true);
  const route = useRoute();
  const usr = route.params.usr

  useEffect(() => {
    fetchData(usr).then((data) => {
      if(data.length===0){
        setHasRepos(false)
      }
      else {
        setRepos(data);
      }
    });
  }, [usr]);

  if (hasRepos) {
    return (
      <FlatList
        data={repos}
        renderItem={({item}) => 
          <RepoCard name ={item.name} />
        }
        keyExtractor={item => item.id}
      />
    );
  }
  else {
    return (
      <View style={styles.noRepos}>
        <Text>Este perfil não tem repositórios</Text>
      </View>
    )
  }
}

export default ProfileRepos;

const styles = StyleSheet.create({
  noRepos: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});