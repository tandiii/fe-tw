import { AsyncStorage } from "react-native";
import { StyleSheet, Text, View } from "react-native"

export default CardProfileDetail =({label,data})=>{
  
             
    return (
        <View style={Styles.main}>
            <Text>{label}:</Text>
            <Text>{data}</Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    main:{
        width:"100%",
        backgroundColor:"#EEF5FF",
        borderRadius:10,
        paddingVertical:8,
        paddingHorizontal:20,
    }
})