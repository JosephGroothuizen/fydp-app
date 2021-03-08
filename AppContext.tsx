import React from 'react';

export const AppContext = React.createContext<{
  image: string;
  classification: string;
  setImage: (image: string) => void;
  setClassification: (classification: string) => void;
}>({
  image: '',
  setImage: () => {},
  classification: '',
  setClassification: () => {},
});
