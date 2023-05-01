import { useContext } from 'react';
import {
  CreateRigFormContext,
  CreateRigFormSteps,
  CreateRigType,
  CreateRigDraftType,
} from './CreateRigFormProvider';

const useCreateRigForm = () => {
  const context = useContext(CreateRigFormContext);

  if (!context) {
    throw new Error(
      'useCreateRigForm can not be used outside of CreateRigFormProvider',
    );
  }

  return context;
};

export default useCreateRigForm;
export { CreateRigFormSteps, CreateRigType, CreateRigDraftType };
