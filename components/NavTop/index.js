import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default NavTop = ({label,onPress})=>{
    return(
        <TouchableOpacity style={Styles.main__wrapper} onPress={onPress}>
            <Icon name={"arrow-left"} background="none" size={28}  />
            <Text style={Styles.text}>{label}</Text>
        </TouchableOpacity>
    )
}

const Styles = StyleSheet.create({
    main__wrapper:{
        marginTop:50,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
        borderBottomColor:"grey",
        backgroundColor:"white",
        padding:10,
    },
    text:{
        fontSize:16,
        fontWeight:"500",
        marginLeft:20
    }
})