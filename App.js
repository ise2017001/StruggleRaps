import React from 'react';
import {Alert} from 'react-native';
import  * as Facebook from 'expo-facebook';


import {StyleSheet, Text, View} from 'react-native';
import {f, auth, database, storage} from './config/config.js';
import {SocialIcon} from 'react-native-elements';
import TouchableHighlight from "react-native-web/src/exports/TouchableHighlight";


export default class App extends React.Component {
    constructor(props) {
        super(props);

        //https://firebase.google.com/docs/auth/web/manage-users
        f.auth().onAuthStateChanged(function (user) {
            //this function returns an observer whenever there is a change in the state of the user object
            if (user) {
                // User is signed in.
                console.log('User already signed in');
                this.signOutUserwithEmail;
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
                        this.loginWithFacebook();
                    }}
                />


            </View>
        );
    }

    signOutUserwithEmail = () => {
        f.auth().signOut()
            .then(() => {
                console.log('User logged out');
            }).catch((error) => {
            console.log(error.code, error.message);
        });
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

    // async loginWithFacebook() {
    //     //expo api gets credentials and firebase takes care of the authentication with these credentials
    //     //so first explore expo's facebook api docs
    //     // https://docs.expo.io/versions/latest/sdk/facebook/
    //     //then firebase docs for facebook login
    //
    //     const {
    //       type,
    //       token,
    //       } = await Expo.Facebook.logInWithReadPermissionsAsync('486329201914935', {
    //       permissions: ['public_profile'],
    //     }).then(()=>{console.log('success')})
    //         .catch((error)=>console.log('error', error.code, error.message));
    //
    //     if (type === 'success') {
    //         const credentials = f.auth.FacebookAuthProvider.credential(token);
    //                 f.auth.signInWithCredential(credentials).catch((error) => {
    //                     console.log('Error logging in with facebook', error.message);
    //                 });
    //     }
            async loginWithFacebook() {
        try {
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync('486329201914935', {
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                const credentials = f.auth.FacebookAuthProvider.credential(token);
                f.auth.signInWithCredential(credentials).catch((error) => {
                    console.log('Error logging in with facebook', error.message);
                })
            } else {
                // type === 'cancel'
                console.log('signin cancelled');
            }
        } catch ({message}) {
            alert(`Facebook Login Error: ${message}`);
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
