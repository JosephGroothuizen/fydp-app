import * as React from 'react';

import {StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {AppContext} from '../AppContext';

import Container from '../components/Container';
import {buttonStyles, iconStyles} from './Scanning';

interface Props {
  navigation: any;
}

const Sorting: React.FC<Props> = ({navigation}) => {
  const {classification} = React.useContext(AppContext);

  const priorPage = () => {
    navigation.navigate('Determining');
  };

  const homePage = () => {
    navigation.navigate('Scanning');
  };

  return (
    <Container>
      <>
        <Button
          onPress={homePage}
          icon={{...iconStyles, name: 'home'}}
          title="Home"
          buttonStyle={styles.buttonStyles}
        />
        <Button
          onPress={priorPage}
          icon={{...iconStyles, name: 'backspace'}}
          title="Back"
          buttonStyle={styles.buttonStyles}
        />
        <Text>Classification Determined:</Text>
        <Text>
          {classification.charAt(0).toUpperCase() + classification.slice(1)}
        </Text>
      </>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonStyles: buttonStyles,
});

export default Sorting;
