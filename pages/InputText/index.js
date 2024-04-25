import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect } from "react";
import NavTop from "../../components/NavTop"
import Gap from "../../components/Gap";
import { useState } from "react";
import TextInputCompt from "../../components/TextInputCompt";
import { SelectList } from "react-native-dropdown-select-list";
import ICAUDIO from "../../assets/IC-Audio.png";
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from "react-native-alert-notification";
import axios from "axios";
import { Audio } from "expo-av";

export default InputText = ({ navigation }) => {
  const [textInput, setTextInput] = useState("")
  const [selected, setSelected] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState(null);
  const [sound, setSound] = useState();

  const data = [
    { key: '1', value: 'Indonesia' },
    { key: '2', value: 'Aceh' }
  ]

  const handleSave = async () => {
    try {
      setLoading(true);
  
      const response = await axios.post("https://tandi.pythonanywhere.com/text-to-speech", {
        text: textInput,
      });
  
      // Example: If audio_file is nested within a 'data' property
      setAudio(response?.data?.audio_file);

  
      // Show success dialog
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Berhasil Tersimpan!',
        textBody: "Audio berhasil disimpan.",
        button: 'close',
      });
  
    } catch (error) {
      console.error("Error:", error);
  
      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server responded with non-2xx status:", error.response.data);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
  
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Gagal Tersimpan!',
        textBody: "Gagal Tersimpan!",
        button: 'close',
      });
    } finally {
      setLoading(false);
    }
  };

  async function playSound() {
    try {
      console.log('Loading Sound');
      
      // Assuming you have the correct URL for your Flask server
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://tandi.pythonanywhere.com/get-audio' },
        { shouldPlay: true }
      );
  
      setSound(sound);
  
      console.log('Playing Sound');
      await sound.playAsync();
    } catch (error) {
      console.error('Error loading or playing sound:', error);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);



  return (
    <AlertNotificationRoot>
      <NavTop label={"InputText"} onPress={() => {
        navigation.navigate("MainDashboard");
      }} />
      <View style={Styles.main__wrapper}>
        <TextInputCompt placeholder={"Masukkan Text"} height={100} multiline={true} textAlignVertical={"top"} secureTextEntry={false} onChangeText={text => setTextInput(text)} />
        <Gap height={20} />

        <Gap height={10} />
        <View style={Styles.inner__wrapper}>
          <SelectList
            boxStyles={{ width: 225 }}
            style={Styles.select}
            setSelected={(val) => setSelected(val)}
            data={data}
            save="value"
          />
          <TouchableOpacity onPress={() => {
            // navigation.navigate("Login")
            playSound();
          }} style={Styles.btn_sound}>
            {/* <Icon name={"file-sound-o"} background="none" size={20} /> */}
            <Image source={ICAUDIO} width={10} height={10} style={Styles.img__btn__sound} />

          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => {
          handleSave();
        }} style={Styles.wrapper__btn__logout}>
          <Text style={Styles.text}>{loading ? "Saving..." : "Save"}</Text>
        </TouchableOpacity>
      </View>
    </AlertNotificationRoot>

  )
}


const Styles = StyleSheet.create({
  main__wrapper: {
    backgroundColor: "white",
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center"
  },
  wrapper__btn__logout: {
    marginTop: 80,
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "blue",
    borderRadius: 30,
    color: "white",
    width: 100,
    padding: 12,
  },
  inner__wrapper: {
    borderRadius: 20,
    borderWidth: 1,
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "500"
  },
  btn_sound: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  img__btn__sound: {
    width: 20,
    height: 20
  },
  select: {
    width: 200
  }
})
