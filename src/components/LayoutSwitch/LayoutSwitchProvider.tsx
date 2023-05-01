import { createContext, useCallback, useState } from 'react';

export enum LayoutType {
  List = 'list',
  Card = 'card',
}

type LayoutSwitchContextType = {
  layoutType: LayoutType;
  changeLayoutType: (layoutType: LayoutType) => void;
};

export const LayoutSwitchContext =
  createContext<LayoutSwitchContextType | null>(null);

interface LayoutSwitchProviderProps {
  children: JSX.Element;
  storageKeyName: string;
}

const LayoutSwitchProvider = ({
  children,
  storageKeyName,
}: LayoutSwitchProviderProps) => {
  const [layoutType, setLayoutType] = useState(() => {
    const storageItem = localStorage.getItem(storageKeyName);

    if (storageItem) {
      if (Object.values<string>(LayoutType).includes(storageItem)) {
        return storageItem as LayoutType;
      } else {
        localStorage.removeItem(storageKeyName);
      }
    }
    return LayoutType.List;
  });
  const changeLayoutType = useCallback(
    (newLayoutType: LayoutType) => {
      setLayoutType(newLayoutType);
      localStorage.setItem(storageKeyName, newLayoutType);
    },
    [storageKeyName],
  );

  return (
    <LayoutSwitchContext.Provider value={{ layoutType, changeLayoutType }}>
      {children}
    </LayoutSwitchContext.Provider>
  );
};

export default LayoutSwitchProvider;
