import { StyleSheet,  TextInput, TouchableOpacity, View } from "react-native";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';


const TextInputCompt = ({placeholder,secureTextEntry,onChangeText,height,textAlignVertical,multiline,passIcon}) =>{
  const [show,setShow] = useState(true);
  
    return (
       <View  style={styles.input(height,textAlignVertical)}>
         <TextInput
       style={{flexDirection:'row',justifyContent:"flex-start",width:"100%"}}
        secureTextEntry={passIcon ? show : secureTextEntry}
        placeholder={placeholder}
        multiline={multiline}
        defaultValue=""
        onChangeText={onChangeText}
        // value={text}
      />
       
      {
        passIcon && <TouchableOpacity style={{alignSelf:"center",alignItems:"center", flexDirection:"row",right:12, position:"absolute"}} onPress={()=>{
          setShow(!show);
         }}>
          {!show ? <Icon name={"eye"} background="none" size={12}  /> : <Icon name={"eye-slash"} background="none" size={12}  />} 
    
         </TouchableOpacity>
      }
       </View>
    )
}

export default TextInputCompt;


const styles =  StyleSheet.create({
    input:(height,textAlignVertical) =>({
    borderRadius:20,
      backgroundColor: '#fff',
      minWidth:"100%",
      position:"relative",
      borderColor:"blue",
      height:height,
      borderWidth:1,
      alignItems: 'center',
      paddingHorizontal:12,
      // marginHorizontal:112,
      paddingVertical:6,
      flexDirection:"row",
      textAlignVertical: textAlignVertical,
      justifyContent: 'space-between',
      
    }),
   
  });
  

