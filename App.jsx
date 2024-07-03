import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
//import Camera from 'react-native-vision-camera';
import * as Location from 'expo-location';
import MainStack from './navigate';


const App = () => {

  const [hasCameraPermission, setCameraPermission] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        setPermissionGranted(false);
      } else {
        setPermissionGranted(true);
      }
      
      //const cameraPermission = await Camera.requestCameraPermissionsAsync();
      //const audioPermission = await Camera.requestMicrophonePermissionsAsync();

      //setCameraPermission(cameraPermission.status === "granted");
    };

    requestPermissions();
  }, []); // Run only once on component mount



  

  if (!permissionGranted && !hasCameraPermission) {
    return (
      <View style={styles.container}>
        <Text>Permission to access location was denied</Text>
      </View>
    );
  }

  return <MainStack />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;