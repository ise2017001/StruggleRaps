import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {f, auth, database, storage} from './config/config';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>In the bleak mid winter!</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
