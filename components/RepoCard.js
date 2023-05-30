import { StyleSheet, Text, View } from 'react-native';

const RepoCard = props => {
  return (
  <View style={styles.repoCard} >
      <View style={styles.name}>
        <Text>{props.name}</Text>
      </View>
  </View>
  );
};

export default RepoCard

const styles = StyleSheet.create({
    repoCard: {
      height: 60,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 25,
      backgroundColor: "#fff",
      flexDirection: "row"
    },
    name : {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
  });