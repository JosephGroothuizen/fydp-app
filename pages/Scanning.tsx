import * as React from 'react';
import * as ImageManipulator from 'expo-image-manipulator';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Image} from 'react-native-elements';
import {Camera} from 'expo-camera';
import {AppContext} from '../AppContext';

import Container from '../components/Container';

interface Props {
  navigation: any;
}

export const iconStyles = {
  size: 15,
  color: 'white',
};

export const buttonStyles = {
  height: 50,
  width: 150,
  marginVertical: 25,
};

export const imageStyles = {
  width: 350,
  height: 350,
};

const Scanning: React.FC<Props> = ({navigation}) => {
  const {setImage} = React.useContext(AppContext);
  const [hasPermission, setHasPermission] = React.useState(false);
  const [isCameraReady, setIsCameraReady] = React.useState(false);
  const [isPreview, setIsPreview] = React.useState(false);
  const [source, setSource] = React.useState('');
  const cameraRef = React.useRef<Camera>(null);

  const requestPermissionsAsync = async () => {
    const {status} = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  React.useEffect(() => {
    requestPermissionsAsync();
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 0,
        base64: true,
        skipProcessing: false,
      };
      setIsCameraReady(false);
      const data = await cameraRef.current.takePictureAsync(options);
      const uri = data.uri;

      if (uri) {
        const manipResult = await ImageManipulator.manipulateAsync(uri, [], {
          compress: 0.35,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true,
        });
        const source = manipResult.base64;
        if (source) {
          setIsPreview(true);
          setSource(source);
          setImage(source);
        }
      }
    }
  };

  const cancelPreview = () => {
    setIsPreview(false);
  };

  const advancePage = () => {
    navigation.navigate('Determining');
  };

  const renderPreview = () => (
    <React.Fragment>
      <View style={styles.buttonContainer}>
        <Button
          onPress={cancelPreview}
          icon={{...iconStyles, name: 'close'}}
          title="Retake"
          buttonStyle={{...styles.buttonStyles, marginRight: 25}}
        />
        <Button
          onPress={advancePage}
          icon={{...iconStyles, name: 'check'}}
          title="Continue"
          buttonStyle={styles.buttonStyles}
        />
      </View>
      <Image
        source={{uri: `data:image/jpg;base64,${source}`}}
        style={styles.cameraStyle}
      />
    </React.Fragment>
  );

  const renderCamera = () => (
    <React.Fragment>
      <Camera
        ref={cameraRef}
        onCameraReady={onCameraReady}
        style={styles.cameraStyle}
        type={Camera.Constants.Type.back}
        onMountError={(error) => {
          console.log('cammera error', error);
        }}
      />
      <Button
        onPress={takePicture}
        disabled={!isCameraReady}
        buttonStyle={styles.buttonStyles}
        title="Capture"
        icon={{...iconStyles, name: 'vignette'}}
      />
    </React.Fragment>
  );

  return (
    <Container>
      {hasPermission === false ? (
        <React.Fragment>
          <Text>No access to camera</Text>
          <Button
            type="solid"
            title="Request Access"
            onPress={requestPermissionsAsync}
          />
        </React.Fragment>
      ) : (
        <View style={styles.cameraButtonStyles}>
          {isPreview ? renderPreview() : renderCamera()}
        </View>
      )}
    </Container>
  );
};

export const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    maxHeight: 25,
  },
  cameraButtonStyles: {
    display: 'flex',
    alignItems: 'center',
  },
  cameraStyle: imageStyles,
  buttonStyles: buttonStyles,
  closeCross: {
    width: '68%',
    height: 1,
    backgroundColor: 'black',
  },
});

export default Scanning;
