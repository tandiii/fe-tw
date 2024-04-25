import { Text, View,StyleSheet } from "react-native"
import Button from "../../components/Button"
import CardMenu from "../../components/CardMenu"
import Gap from "../../components/Gap"
import SyncStorage from 'sync-storage';


const MainDashboard = ({navigation})=>{
    const user = SyncStorage.get("user");

    return (
        <View style={Styles.main__wrapper}>
            <Text style={Styles.welcome__text}>Welcome, {user?.data?.nama}</Text>
            <Gap height={60}/>

            <View style={Styles.inner__wrapper}>
            <CardMenu icon={"file-image-plus"} label={"Upload Gambar"} onPress={()=>{
                navigation.navigate("UnggahGambar")
            }}/>
            <Gap height={20}/>
            <CardMenu icon={"card-text-outline"} label={"Input Text"} onPress={()=>{
                navigation.navigate("InputText")
            }}/>
            <Gap height={20}/>
            <CardMenu icon={"face-man-profile"} label={"Profile"} onPress={()=>{
                navigation.navigate("Profile")
            }}/>
            </View>
           

        </View>
    )
}


export default MainDashboard


const Styles = StyleSheet.create({
    main__wrapper:{
        backgroundColor:"white",
        flex:1,
        paddingVertical:60,
        paddingHorizontal:30,
    },
    welcome__text:{
        textAlign:'left',
        fontSize:21,
        fontWeight:"500",

    },inner__wrapper:{
       flexDirection:"column",
        justifyContent:"space-between"
    }
})