import * as React from 'react';
import {View} from 'react-native';

import styles from './ContainerStyles';

interface Props {
  children: JSX.Element;
}

const Container: React.FC<Props> = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

export default Container;
