import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Image} from 'react-native-elements';
import {AppContext} from '../App';

import Container from '../components/Container';

const Determining: React.FC = ({}) => {
  const {image} = React.useContext(AppContext);

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
      const imageResp = await postReq.json();
      console.log(imageResp);
      // example resp: {"classification":"compost"}
    };

    postImage();
  }, [image]);

  return (
    <Container>
      <>
        <Text h1>Determining Component</Text>
        <Image
          source={{uri: `data:image/png;base64,${image}`}}
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
});

export default Determining;
