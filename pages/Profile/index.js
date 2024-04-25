import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import NavTop from "../../components/NavTop"
import CardProfileDetail from "../../components/CardProfileDetail";
import Gap from "../../components/Gap";
import Icon from 'react-native-vector-icons/FontAwesome';
import SyncStorage from 'sync-storage';


export default Profile = ({ navigation }) => {
    const user = SyncStorage.get("user");
    console.log(user)
    return (
        <>
            <NavTop label={"Profile"} onPress={() => {
                navigation.navigate("MainDashboard");
            }} />
            <View style={Styles.main__wrapper}>
                <CardProfileDetail label={"Nama"} data={user?.data?.nama} />
                <Gap height={10} />
                <CardProfileDetail label={"Email"} data={user?.data?.email} />
                <Gap height={10} />
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("Login")
                }} style={Styles.wrapper__btn__logout}>
                    <Icon name={"sign-out"} background="none" size={20} />
                    <Gap widht={30} />
                    <Text style={Styles.text}>Keluar</Text>
                </TouchableOpacity>
            </View>
        </>

    )
}

const Styles = StyleSheet.create({
    main__wrapper: {
        backgroundColor: "white",
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    wrapper__btn__logout: {
        marginTop: 80,
        justifyContent: "center",
        flexDirection: "row"
    }
})