import { StyleSheet, TouchableOpacity,Text } from "react-native"

const Button = ({onPress,label})=>{
    return(
        <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button:{
        backgroundColor:"blue",
        borderRadius:20,
        paddingHorizontal:20,
        paddingVertical:10,
        textAlign:"center",
    },
    text:{
        color:"white",
        fontWeight:"500",
        fontSize:15,
        textAlign:"center"
    }
})