import React from 'react';
import * as Facebook from 'expo-facebook';

import {StyleSheet, Text, TextInput, View} from 'react-native';

import {f, auth, database, storage} from './config/config.js';
import {SocialIcon, Button} from 'react-native-elements';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
        //https://firebase.google.com/docs/auth/web/manage-users
        //check if the user is already logged in
        const that = this;
        f.auth().onAuthStateChanged(function (user) {
            //this function returns an observer whenever there is a change in the state of the user object
            if (user) {
                // User is signed in.
                console.log('User already signed in');
                that.setState({
                    loggedIn: true
                });
            } else {
                // No user is signed in.
                console.log('No user is signed in at the moment');
                that.setState({
                    loggedIn: false
                })
            }
        });
        //this.signupUserWithEmail('randomemail@random.com', 'password');
    }

    render() {
        console.log("Inside render");
        return (
            <View style={styles.container}>

                {
                    this.state.loggedIn === true ? (
                        <View>
                            <Text> The user is already logged in</Text>
                            <Button
                                title="Logout"
                                buttonStyle={{backgroundColor: '#e91e5e'}}
                                onPress={() => {
                                    this.signUserOut();
                                }}
                            />
                        </View>
                    ) : (
                        <View>
                            {
                                this.state.emailLoginView === true ? (
                                    <View>
                                        <Text> Email : </Text>
                                        <TextInput
                                            onChangeText={(text) => this.setState({email: text})}
                                            value={this.state.email}
                                        />

                                        <Text> Password : </Text>
                                        <TextInput
                                            onChangeText={(text) => this.setState({password: text})}
                                            secureTextEntry={true}
                                            value={this.state.password}
                                        />

                                        <Button
                                            title="Email Login"
                                            buttonStyle={{backgroundColor: '#00a594'}}
                                            onPress={() => {
                                                this.loginUserWithEmail(this.state.email, this.state.password)
                                                    .then(()=>{console.log("User logged in with email and password")})
                                                    .catch((error)=>{console.log(error.code, error.message)});
                                            }}
                                        />
                                    </View>
                                ) : (
                                    <View></View>
                                )
                            }
                            <Button
                                title="Email Login"
                                buttonStyle={{backgroundColor: '#00a594'}}
                                onPress={() => {
                                    this.setState({emailLoginView: true})
                                }}
                            />
                            <SocialIcon
                                title='Sign In With Facebook'
                                button
                                type='facebook'
                                onPress={() => {
                                    this.facebookLogin();
                                }}
                            />
                        </View>
                    )
                }
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

    signUserOut = () => {
        f.auth().signOut().then(() => {
            console.log('User logged out');
        }).catch((error) => {
            console.log(error.message, error.code);
        })
    }

    loginUserWithEmail = async (email, password) => {
        if (email !== '' && password !== '') {
            try {
                let user = await f.auth().signInWithEmailAndPassword(email, password)
                    .catch((error) => {
                        console.log(error.code, error.message);
                    });
                console.log(user);
            } catch (error) {
                console.log(error.code, error.message);
            }
        } else {
            console.log('Either the password or the email is empty!');
        }
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
                .then(() => {
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
