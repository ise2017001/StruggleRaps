import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {f, auth, database, storage} from './config/config.js';

export default class App extends React.Component {

    constructor(props) {
      super(props);

      this.signupUserWithEmail('randomemail@random.com', 'password');
    }
    render() {
        console.log("Inside render");
        return (
            <View style={styles.container}>
                <Text style = {{color : 'white'}}>In the bleak mid winter!</Text>
            </View>
        );
    }

    signupUserWithEmail = (email, password) => {
      //available in firebase docs
      //search-term firebase user register with email and password
      f.auth().createUserWithEmailAndPassword(email, password)
          .then((userObj) => {
            console.log(email, userObj);
          }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
      });
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        // fontFamily : 'Arial',
        fontSize : 9,

    },
});
