import { useContext } from 'react';
import { CreateWellFormContext } from 'containers/CreateWellForm/CreateWellFormProvider';

const useCreateWellForm = () => {
  const context = useContext(CreateWellFormContext);
  if (!context) {
    throw new Error(
      'useCreateWellForm cannot be used outside of CreateWellFormProvider',
    );
  }
  return context;
};

export default useCreateWellForm;
