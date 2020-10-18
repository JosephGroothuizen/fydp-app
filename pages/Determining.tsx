import * as React from 'react';
import {Text, Button} from 'react-native-elements';
import {Camera} from 'expo-camera';

import Container from '../components/Container';
import CameraStyles from '../components/CameraStyles';

const Determining: React.FC = ({}) => {
  const [hasPermission, setHasPermission] = React.useState(false);

  const requestPermissionsAsync = async () => {
    const {status} = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  React.useEffect(() => {
    requestPermissionsAsync();
  }, []);

  if (hasPermission === false) {
    return (
      <React.Fragment>
        <Text>No access to camera</Text>
        <Button onPress={requestPermissionsAsync}>Request Access</Button>
      </React.Fragment>
    );
  }

  return (
    <Container>
      <Camera style={CameraStyles.preview} type={Camera.Constants.Type.back} />
    </Container>
  );
};

export default Determining;
