import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text, Image} from 'react-native-elements';
import {AppContext} from '../AppContext';

import Container from '../components/Container';
import {buttonStyles, iconStyles} from './Scanning';

interface Props {
  navigation: any;
}

const Determining: React.FC<Props> = ({navigation}) => {
  const {image, setClassification} = React.useContext(AppContext);

  React.useEffect(() => {
    const postImage = async () => {
      const postReq = await fetch(
        'http://garbagesorter9000restapi.azurewebsites.net/categorize/picture',
        {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({image}),
        },
      );
      let imageResp = await postReq.json();
      imageResp = JSON.parse(imageResp);
      // example resp: {"classification":"compost"}
      if (imageResp.classification) {
        setClassification(imageResp.classification);
        advancePage();
      }
    };

    postImage();
  }, [image]);

  const priorPage = () => {
    navigation.navigate('Scanning');
  };

  const advancePage = () => {
    navigation.navigate('Sorting');
  };

  return (
    <Container>
      <>
        <Button
          onPress={priorPage}
          icon={{...iconStyles, name: 'backspace'}}
          title="Back"
          buttonStyle={styles.buttonStyles}
        />
        <Text>Determining the Correct Placement</Text>
        <Button loading type="clear" />
        <Image
          source={{uri: `data:image/jpg;base64,${image}`}}
          style={styles.imageStyle}
        />
      </>
    </Container>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 350,
    height: 500,
  },
  buttonStyles: buttonStyles,
});

export default Determining;
