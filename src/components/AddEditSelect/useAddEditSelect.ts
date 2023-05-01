import { useContext } from 'react';
import { AddEditSelectContext } from './AddEditSelectProvider';

const useAddEditSelect = () => {
  const context = useContext(AddEditSelectContext);
  if (!context) {
    throw new Error(
      'useAddEditSelect cannot be used outside of AddEditSelectProvider',
    );
  }
  return context;
};

export default useAddEditSelect;
