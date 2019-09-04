import React from 'react';
import * as Facebook from 'expo-facebook';

import {StyleSheet, Text, View} from 'react-native';
import {f, auth, database, storage} from './config/config.js';
import {SocialIcon} from 'react-native-elements';


export default class App extends React.Component {
    constructor(props) {
        super(props);

        //https://firebase.google.com/docs/auth/web/manage-users
        f.auth().onAuthStateChanged(function (user) {
            //this function returns an observer whenever there is a change in the state of the user object
            if (user) {
                // User is signed in.
                console.log('User already signed in');

                    f.auth().signOut()
                        .then(() => {
                            console.log('User logged out');
                        }).catch((error) => {
                        console.log(error.code, error.message);
                    });

            } else {
                // No user is signed in.
                console.log('No user is signed in at the moment');
            }
        });
        //this.signupUserWithEmail('randomemail@random.com', 'password');
    }

    render() {
        console.log("Inside render");
        return (
            <View style={styles.container}>

                <Text style={{fontFamily: 'Roboto', color: 'white'}}>In the bleak mid winter!</Text>


                <SocialIcon
                    title='Sign In With Facebook'
                    button
                    type='facebook'
                    onPress={() => {
                        this.facebookLogin();
                    }}
                />
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

    async facebookLogin() {
        try {
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions
            } = await Facebook.logInWithReadPermissionsAsync(
                '486329201914935', {permissions: ['email', 'public_profile'],})
                .then(()=>{
                    console.log('Trying to login');
                });
            if (type === 'success') {
                const credentials = f.auth.FacebookAuthProvider.credential(token);
                f.auth().signInWithCredential(credentials).catch((error) => {
                    console.log('Error :', error);
                })
            } else {
                console.log('Cancelled');
            }
        } catch ({message}) {
            console.log('Error login message', message);
        }
        }
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        // fontFamily : 'Arial',
        fontSize: 9,
    },
});
