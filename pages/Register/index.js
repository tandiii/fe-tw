import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import ImLogin from "../../assets/imLogin.png";
import { useState } from 'react';
import TextInputCompt from '../../components/TextInputCompt';
import Gap from '../../components/Gap';
import Button from '../../components/Button';
import axios from 'axios';

const Register = ({navigation}) => {
    const [pass, setPass] = useState("")
    const [email, setEmail] = useState("")
    const [nama,setNama] = useState("")
    const [loading,setLoading]=useState(false)

    const handleRegister = async ()=>{
        setLoading(true);
        const res = await axios.post(`${process.env.GLOBAL_IP}/user`,{
            nama: nama,
            email:email,
            password: pass,
        });
        if(res?.status === 201){
            setLoading(false);
            navigation.navigate("Login")
        }
    }


    return (
    //    <AlertNotificationRoot>
        
    //     </AlertNotificationRoot>
    <View style={styles.container}>
    <View style={styles.header__wrapper}>
        <Image source={ImLogin} width={100} height={100} style={styles.img} />
        <Text style={styles.header__text}>
            Text To Speech
        </Text>
    </View>
    <Gap height={20} />

    <View>
        <TextInputCompt placeholder={"Masukkan Nama"} secureTextEntry={false} onChangeText={y => setNama(y)} />
        <Gap height={20} />
        <TextInputCompt placeholder={"Masukkan Email"} secureTextEntry={false} onChangeText={text => setEmail(text)} />
        <Gap height={20} />
        <TextInputCompt placeholder={"Masukkan Password"} secureTextEntry={true} onChangeText={(e) => {
            setPass(e)
        }} />
        <Gap height={20} />
        <TextInputCompt placeholder={"Ulangi Password"} secureTextEntry={true} />
        <Text onPress={()=>{
          navigation.navigate("Login")
        }} style={styles.text__register}>Login</Text>
        <Gap height={30} />

        <Button label={loading ? "Loading..." : "Register"} onPress={()=>{
             handleRegister();
        }}/>
    </View>
    <StatusBar style="auto" />
</View>
    )
}


export default Register;

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
    text__register:{
        fontSize:12,
        color: "blue",
        textDecorationLine:"underline",
        textAlign:"right",
        marginTop:12
    }
});