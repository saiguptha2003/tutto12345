import { StyleSheet } from "react-native";

const st = StyleSheet.create({
    container: {
      backgroundColor: '#ECE3CE',
      flex: 1,
      marginBottom: 5,
    },
    content: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: '#ffff',
      marginTop: 10,
      marginBottom: 5,
      width: '95%',
      height: 300,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.9,
      shadowRadius: 5,
      fontFamily: 'Roboto',
    },
    image: {
      width: 200,
      height: 200,
    },
    heading: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#000',
      paddingTop: 10,
      fontFamily: 'Roboto',
    },
  });
  export default st;