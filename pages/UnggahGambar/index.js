import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, {  useEffect, useState } from "react";
import NavTop from "../../components/NavTop";
import Gap from "../../components/Gap";
import { SelectList } from "react-native-dropdown-select-list";
import ICAUDIO from "../../assets/IC-Audio.png";
import ICUPIMG from "../../assets/IC-UPLOADIMG.png";
import * as ImagePicker from "expo-image-picker";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
  Toast,
} from "react-native-alert-notification";
import SyncStorage from "sync-storage";
import axios from "axios";
import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";




const user = SyncStorage.get("user");

const createFormData = (asset) => {
  const data = new FormData();

  const fileUri =
    Platform.OS === "android" ? asset.uri : asset.uri.replace("file://", "");
  const file = {
    uri: fileUri,
    type: "image/jpeg", // atau tipe file yang sesuai
    name: user?.data?.email + "_" + asset.uri.split("/").pop(),
  };

  data.append("file", {
    uri: file.uri,
    type: file.type,
    name: file.name,
  });

  return data;
};


export default function UnggahGambar({ navigation }) {
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [textToSpeech,setTextToSpeech] = useState(null);
  const [sound, setSound] = useState();
  const [audio, setAudio] = useState(null);
  const [process,setProcess] = useState(false);

  const data = [
    { key: "1", value: "Indonesia" },
    { key: "2", value: "Aceh" },
    { key: "3", value: "Inggris", disabled: true },
  ];
  
  const [photo, setPhoto] = useState(null);

 const handleChoosePhotoByCamera = async () => {
   try {
     const { status } = await ImagePicker.requestCameraPermissionsAsync();
     if (status !== "granted") {
       Toast.show({
         type: "error",
         text1: "Izin Ditolak",
         text2: "Izin akses kamera diperlukan untuk memilih gambar.",
       });
       return;
     }

     const result = await ImagePicker.launchCameraAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.Images,
       allowsEditing: true,
       aspect: [4, 3],
       quality: 1,
     });

     if (!result.canceled) {
       const selectedAsset = result.assets[0];
       setPhoto(selectedAsset);
       setImage(selectedAsset.uri);
     }
   } catch (error) {
     Toast.show({
       type: "error",
       text1: "Terjadi Kesalahan",
       text2: error.message,
     });
   }
 };






  
  const handleChoosePhoto = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Izin Ditolak",
          text2: "Izin akses galeri diperlukan untuk memilih gambar.",
        });
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedAsset = result.assets[0];
        setPhoto(selectedAsset);
        setImage(selectedAsset.uri);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Terjadi Kesalahan",
        text2: error.message,
      });
    }
  };


const handleSave = async () => {
  try {
    setProcess(true);

    const response = await axios.post(
      "https://tandi.pythonanywhere.com/text-to-speech",
      {
        text: textToSpeech?.text,
      }
    );

    // Example: If audio_file is nested within a 'data' property
    setAudio(response?.data?.audio_file);

  } catch (error) {
    console.error("Error:", error);

    if (error.response) {
      // The request was made, but the server responded with a status code
      // that falls out of the range of 2xx
      console.error(
        "Server responded with non-2xx status:",
        error.response.data
      );
    } else if (error.request) {
      // The request was made, but no response was received
      console.error("No response received from the server");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
    }

  } finally {
    setProcess(false);
  }
};

const handleUpload = async () => {
  try {
    setLoading(true);

    const uploadRequest = fetch(
      "https://b900-180-241-70-22.ngrok-free.app/uploadfile/",
      {
        method: "POST",
        body: createFormData(photo),
        timeout: 10000, // Set timeout to 10 seconds (10000 milliseconds)
      }
    );

    const imageToTextRequest = fetch(
      "https://b900-180-241-70-22.ngrok-free.app/image-to-text/",
      {
        method: "POST",
        body: createFormData(photo),
      }
    );

    const [uploadResponse, imageToTextResponse] = await Promise.all([
      uploadRequest,
      imageToTextRequest,
    ]);

    if (!uploadResponse.ok) {
      throw new Error(
        `Upload request failed with status: ${uploadResponse.status}`
      );
    }

    await uploadResponse.json(); // Await the response before proceeding further

    if (!imageToTextResponse.ok) {
      throw new Error(
        `Image to text request failed with status: ${imageToTextResponse.status}`
      );
    }

    const textToSpeechData = await imageToTextResponse.json(); // Await the response before proceeding further
    setTextToSpeech(textToSpeechData);

    // Execute handleSave

    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Berhasil!",
      textBody: "Semua permintaan berhasil.",
      button: "Tutup",
    });
  } catch (error) {
    console.error("Error:", error.message);
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: "Gagal!",
      textBody: error.message,
      button: "Tutup",
    });
  } finally {
    setLoading(false);
  }
};









async function playSound() {
  try {
    console.log("Loading Sound");

    // Execute handleSave first
    await handleSave();

    // Assuming you have the correct URL for your Flask server
    const { sound } = await Audio.Sound.createAsync(
      { uri: "https://tandi.pythonanywhere.com/get-audio" },
      { shouldPlay: true }
    );

    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  } catch (error) {
    console.error("Error loading or playing sound:", error);
  }
}


useEffect(() => {
  return sound
    ? () => {
        console.log("Unloading Sound");
        sound.unloadAsync();
      }
    : undefined;
}, [sound]);


  return (
    <AlertNotificationRoot>
      <NavTop
        label={"Unggah Gambar"}
        onPress={() => {
          navigation.navigate("MainDashboard");
        }}
      />
      <View style={styles.mainWrapper}>
        {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
        {textToSpeech?.text && (
          <ScrollView style={styles.wrapperTextTs}>
            <Text>{textToSpeech?.text}</Text>
          </ScrollView>
        )}
        <View
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={handleChoosePhoto}
            style={styles.btnUpload}
          >
            <Image source={ICUPIMG} style={styles.uploadIcon} />
            <Gap width={10} />
            <Text>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleChoosePhotoByCamera}
            style={styles.btnUpload}
          >
            <Icon
              name={"camera-plus"}
              background="none"
              size={20}
              style={{ marginRight: 8 }}
            />

            <Gap width={10} />
            <Text>Upload</Text>
          </TouchableOpacity>
        </View>
        <Gap height={20} />
        <View style={styles.innerWrapper}>
          <SelectList
            boxStyles={{ width: 225 }}
            style={styles.select}
            setSelected={(val) => setSelected(val)}
            data={data}
            save="value"
          />
          <TouchableOpacity
            disabled={textToSpeech === null}
            style={styles.btnSound}
            onPress={async () => playSound()}
          >
            <Image source={ICAUDIO} style={styles.audioIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleUpload}
          style={styles.wrapperBtnUpload}
        >
          <Text style={styles.text}>{loading ? "Saving..." : process ? "Proses.." :"Save"}</Text>
        </TouchableOpacity>
      </View>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: "white",
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    overflow: "scroll",
  },
  wrapperBtnUpload: {
    marginTop: 10,
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "blue",
    borderRadius: 30,
    color: "white",
    width: 100,
    padding: 12,
  },
  innerWrapper: {
    borderRadius: 20,
    borderWidth: 1,
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    width:"auto"
  },
  wrapperTextTs: {
    width: "100%",
    borderRadius: 8,
    maxHeight: 100, // Mengganti height dengan minHeight agar dapat berukuran dinamis
    borderWidth: 1,
    borderColor: "red",
    marginBottom: 20,
    padding: 10,
  },

  btnSound: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnUpload: {
    width: 100,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#f2f3f5",
    flexDirection: "row",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  audioIcon: {
    width: 20,
    height: 20,
  },
  select: {
    width: 200,
  },
  imageStyle: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    borderColor: "blue",
    borderWidth: 1,
    marginBottom: 10,
  },
});
