import { useContext } from 'react';
import { InputsHeightContext } from './InputsHeightProvider';

const useInputsHeight = () => {
  return useContext(InputsHeightContext);
};

export default useInputsHeight;
