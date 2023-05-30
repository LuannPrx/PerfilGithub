import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

async function fetchData(usr) {
  const data = await fetch("https://api.github.com/users/"+usr)
    .then((response) => response.json())
  return data.bio;
}

function ProfileBio() {
  const [bio, setBio] = useState("");
  const route = useRoute();
  const usr = route.params.usr

  useEffect(() => {
    fetchData(usr).then((data) => {
      if(data===null){
        setBio("Este usuário não tem bio")
      }
      else {
        setBio(data);
      }
    });
  }, [usr]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{margin: 5}}>{bio}</Text>
    </View>
  );
}

export default ProfileBio;