import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Alert, Modal, TextInput } from 'react-native';
import { useState, useEffect } from 'react';

async function fetchData(usr) {
  const data = await fetch("https://api.github.com/users/"+usr)
    .then((response) => response.json())
  return data;
}

function pressHandler (usr, screen, navigation) {
  if (usr==="") {
    Alert.alert("Usuário não encontrado", "digite um usuário válido")
  }
  else {
    navigation.navigate(screen, {usr: usr})
  }
}

function ProfileScreen({ navigation }) {
  const [usr, setUsr] = useState("")
  const [name, setName] = useState(null)
  const [picture, setPicture] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleInput = () => {
    setUsr(inputText)
    setInputText(null)
    toggleModal();
  };
  
  useEffect(() => {
    fetchData(usr).then((data) => {
      if (data.message==="Not Found"){
        setUsr("")
        setName(null)
      }
      else if(data.name===null){
        setName(usr);
      }
      else {
        setName(data.name);
      }
      setPicture(data.avatar_url)
    });
  }, [usr]);

  return (
    <>
      <StatusBar style='auto' />
      <SafeAreaView style={styles.topSafe}>
        <View style={styles.container}>
          <View style={styles.topLayer}>
              <View style={styles.icon} >
                <View style={styles.profilePicture}>
                  {
                    picture ?
                    <Image
                      style={styles.picture}
                      source={{
                        uri: picture,
                      }}
                    />
                    :
                    null
                  }
                  
                </View>
                <TouchableOpacity style={styles.searchIcon} onPress={toggleModal}>
                  <Ionicons name="search-sharp" size={24} color="white" style={{padding: 8}}/>
                </TouchableOpacity>
                <View style={{justifyContent: "center", alignItems: "center"}}>
                  <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                    <View style={styles.modalContainer}>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Digite o usuário"
                        value={inputText}
                        onChangeText={text => setInputText(text)}
                      />
                      <TouchableOpacity style={styles.searchButton} onPress={handleInput}>
                        <Text style={{fontWeight:"bold", fontSize: 18, color: "#fff"}}>Buscar</Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>
                </View>
              </View>
              <View style={styles.usrInfo}>
                <Text style={{fontWeight: "bold", fontSize: 26}}>{name}</Text>
                <Text style={{color: "gray", fontSize: 18}}>@{usr}</Text>
              </View>
          </View>
          <View style={styles.middleLayer}>
          <View style={styles.rows}>
              <TouchableOpacity onPress={() => pressHandler(usr, 'Bio', navigation)} style={[styles.row, {borderTopWidth: 0}]}>
                <View style={styles.rowIcon}>
                  <View style={styles.iconFrame}>
                    <Ionicons name="ios-person-outline" size={24} color="black" />
                  </View>
                </View> 
                <View style={styles.rowText}>
                  <Text style={styles.rowLabel}>Bio</Text>
                  <Text style={styles.rowDescription}>Um pouco sobre o usuário</Text>
                </View>
                <View style={styles.rowIconUnframed}>
                  <Ionicons name="chevron-forward" size={24} color="black" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>  pressHandler(usr, 'Orgs', navigation)} style={styles.row} >
                <View style={styles.rowIcon}>
                  <View style={styles.iconFrame}>
                    <MaterialCommunityIcons name="headset" size={24} color="black" />
                  </View>
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.rowLabel}>Orgs</Text>
                  <Text style={styles.rowDescription}>Organizações que o usuário faz parte</Text>
                </View>
                <View style={styles.rowIconUnframed}>
                  <Ionicons name="chevron-forward" size={24} color="black" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>  pressHandler(usr, 'Repositórios', navigation)} style={styles.row}>
                <View style={styles.rowIcon}>
                  <View style={styles.iconFrame}>
                    <MaterialCommunityIcons name="file-document-outline" size={24} color="black" />
                  </View>
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.rowLabel}>Repositórios</Text>
                  <Text style={styles.rowDescription}>Lista contendo todos os repositórios</Text>
                </View>
                <View style={styles.rowIconUnframed}>
                  <Ionicons name="chevron-forward" size={24} color="black" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>  pressHandler(usr, 'Seguidores', navigation)} style={styles.row}>
                <View style={styles.rowIcon}>
                  <View style={styles.iconFrame}>
                    <Ionicons name="people-outline" size={24} color="black" />
                  </View>
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.rowLabel}>Seguidores</Text>
                  <Text style={styles.rowDescription}>Lista de seguidores</Text>
                </View>
                <View style={styles.rowIconUnframed}>
                  <Ionicons name="chevron-forward" size={24} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomLayer}>
            <TouchableOpacity style={styles.resetButton} onPress={() => {setUsr(""), setPicture(null), setName(null)}}>
              <Ionicons name="exit-outline" size={24} color="black" />
              <Text style={{fontSize:16}}> Resetar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.bottomSafe}/>
    </>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  topSafe: {
    flex: 1,
    backgroundColor: "#e9ecf5"
  },
  bottomSafe: {
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#f7f8fc",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  topLayer: {
    flex: 16,
  },
  icon: {
    flex: 4,
    marginTop: 40,
    marginHorizontal: 100,
    
  },
  profilePicture: {
    flex: 1,
  },
  picture: {
    flex: 1,
    resizeMode: "contain",
    borderRadius: 70
  },
  searchIcon: {
    backgroundColor: "black",
    position: "absolute",
    bottom:0,
    right:0,
    borderRadius: 8
  },
  modalContainer: {
    margin: 20,
    marginTop: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#4285f5',
    padding: 10,
    borderRadius: 5,
  },
  usrInfo:{
    flex:2,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop:10
  },
  middleLayer: {
    flex: 20,
  },
  rows: {
    flex: 1,
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderColor: "#f0f0f0",
    borderWidth: 2
  },
  row: {
    flex: 1,
    flexDirection: "row",
    borderTopColor: "#f0f0f0",
    borderTopWidth: 2,
  },  
  rowIcon: {
    flex: 2,
  },
  rowIconUnframed: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  iconFrame: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 7,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  rowText: {
    flex: 6,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  rowLabel: {
    fontWeight: "bold"
  },
  rowDescription: {
    fontSize: 12,
    color: "#404040"
  },
  bottomLayer: {
    flex: 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderWidth: 2,
    borderColor: "#f0f0f0",
    borderBottomWidth:0
  },
  resetButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 15
  }
});