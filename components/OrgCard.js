import { StyleSheet, Text, View } from 'react-native';

const OrgCard = props => {
  return (
  <View style={styles.orgCard} >
      <View style={styles.name}>
        <Text>{props.name}</Text>
      </View>
  </View>
  );
};

export default OrgCard

const styles = StyleSheet.create({
    orgCard: {
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