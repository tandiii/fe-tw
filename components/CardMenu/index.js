
import {  StyleSheet, Text, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default CardMenu = ({label,icon,onPress})=>{
    return (
        <TouchableOpacity style={Styles.main__wrapper} onPress={onPress}>
           <Icon name={icon} background="none" size={28}  />
           <Text style={Styles.text}>{label}</Text>
        </TouchableOpacity>
    )
}


const Styles = StyleSheet.create({
    main__wrapper:{
        borderRadius:10,
        width:"100%",
        paddingVertical:28,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:2,
        borderColor:"#176b87"
    },
    text:{
        fontSize:14,
        fontWeight:"500",
        marginTop:8
    }
})