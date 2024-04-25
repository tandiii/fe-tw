import { View,StyleSheet } from "react-native"

const Gap = ({widht,height})=>{
    return(
        <View style={styles.main__wrapper(widht,height)}/>
        
    )
}

export default Gap;

const styles = StyleSheet.create({
    main__wrapper:(widht,height)=>({
        widht:widht,
        height:height,
    })
})