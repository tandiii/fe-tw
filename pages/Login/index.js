 import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import ImLogin from "../../assets/imLogin.png";
import { useState } from 'react';
import TextInputCompt from '../../components/TextInputCompt';
import Gap from '../../components/Gap';
import Button from '../../components/Button';
import axios from 'axios';
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification';
import SyncStorage from 'sync-storage';

const Login = ({ navigation }) => {
    const [pass, setPass] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
      
        try {
            const res = await axios.post(`${process.env.GLOBAL_URL}/user/login`, {
                email: email,
                password: pass
            });
            console.log("TESTT:::", res)
            setEmail("")
            setPass("")
            SyncStorage.set("user", res?.data);
            setLoading(false);
            
            navigation.navigate("MainDashboard");

        } catch (error) {
            setLoading(false);
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Gagal Login!',
                textBody: error?.message || "Gagal Login!",
                button: 'close',
            })
        }
    }

    return (
        <AlertNotificationRoot>
            <View style={styles.container}>
                <View style={styles.header__wrapper}>
                    <Image source={ImLogin} width={100} height={100} style={styles.img} />
                    <Text style={styles.header__text}>
                        Text To Speech
                    </Text>
                </View>
                <Gap height={20} />

                <View >
                    <TextInputCompt placeholder={"Masukkan Email"} secureTextEntry={false} onChangeText={text => setEmail(text)} />
                    <Gap height={20} />
                    <TextInputCompt  passIcon placeholder={"Masukkan Password"} secureTextEntry={true} onChangeText={(e) => {
                        setPass(e)
                    }} />
                    <Text onPress={() => {
                        navigation.navigate("Register")
                    }} style={styles.text__register}>Register</Text>
                    <Gap height={30} />

                    <Button label={loading ? "Loading..." : "Login"} onPress={() => {
                        handleLogin();
                    }} />
                </View>
                <StatusBar style="auto" />
            </View>
        </AlertNotificationRoot>

    )
}


export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingHorizontal: 25,
        justifyContent: 'center',
    },
    header__wrapper: {
        flexDirection: 'col',
        alignItems: "center",

    },
    header__text: {
        fontSize: 21,
        fontWeight: "bold",
        marginTop: 20,
    },
    img: {
        width: 100,
        height: 100
    },
    text__register: {
        fontSize: 12,
        color: "blue",
        textDecorationLine: "underline",
        textAlign: "right",
        marginTop: 12
    }
});