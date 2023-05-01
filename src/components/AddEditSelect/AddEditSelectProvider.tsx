import { createContext, useCallback, useState } from 'react';

type Option = string | number | null | undefined;

type AddEditSelectContextType = {
  isAdding: boolean;
  onAdd: () => void;
  onEdit: (option: Option) => void;
  onClose: () => void;
  editedOption: Option;
};

export const AddEditSelectContext =
  createContext<null | AddEditSelectContextType>(null);

interface AddEditSelectProviderProps {
  children: JSX.Element;
}

const AddEditSelectProvider = ({ children }: AddEditSelectProviderProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editedOption, setEditedOption] = useState<Option>(undefined);
  const onAdd = useCallback(() => {
    setIsAdding(true);
  }, []);
  const onClose = useCallback(() => {
    setIsAdding(false);
    setEditedOption(undefined);
  }, []);
  const onEdit = useCallback((option: Option) => {
    setEditedOption(option);
  }, []);

  return (
    <AddEditSelectContext.Provider
      value={{
        isAdding,
        onAdd,
        onClose,
        onEdit,
        editedOption,
      }}
    >
      {children}
    </AddEditSelectContext.Provider>
  );
};

export default AddEditSelectProvider;
