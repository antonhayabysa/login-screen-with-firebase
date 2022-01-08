import React from 'react';
import {Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Alert} from 'react-native';
import {BlurView} from 'expo-blur';

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from './FirebaseConfig';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';


const uri = 'https://ak.picdn.net/shutterstock/videos/1060308725/thumb/1.jpg'
const profilePicture = 'https://thumbs.dreamstime.com/b/business-man-icon-illustration-business-man-icon-white-background-107722188.jpg'

function HomeScreen() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen</Text>
        </View>
    );
}

function LoginScreen() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Account created!')
                const user = userCredential.user;
                console.log(user)
            })
            .catch(error => {
                console.log(error)
                Alert.alert(error.message)
            })
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Signed in!')
                const user = userCredential.user;
                console.log(user)
                navigation.navigate('Home');
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <View style={styles.container}>
            <Image source={{uri}} style={[styles.image, StyleSheet.absoluteFill]}/>
            <ScrollView contentContainerStyle={{
                flex: 1,
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <BlurView intensity={100}>
                    <View style={styles.login}>
                        <Image source={{uri: profilePicture}} style={styles.profilePicture}/>
                        <View>
                            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>E-mail</Text>
                            <TextInput onChangeText={(text) => setEmail(text)} style={styles.input}
                                       placeholder="E-mail"/>
                        </View>
                        <View>
                            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Password</Text>
                            <TextInput onChangeText={(text) => setPassword(text)} style={styles.input}
                                       placeholder="password" secureTextEntry={true}/>
                        </View>
                        <TouchableOpacity onPress={handleSignIn}
                                          style={[styles.button, {backgroundColor: '#00CFEB90'}]}>
                            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleCreateAccount}
                                          style={[styles.button, {backgroundColor: '#6792F090'}]}>
                            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </ScrollView>
        </View>
    );
}

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Home" component={HomeScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    login: {
        width: 350,
        height: 500,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#fff',
        borderWidth: 1,
        marginVertical: 30
    },
    input: {
        width: 250,
        height: 40,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ffffff90',
        marginBottom: 20
    },
    button: {
        width: 250,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderColor: '#fff',
        borderWidth: 1,
    }

});


