import { createContext } from 'react';

export const DetailItemsContext = createContext<{
  loading: boolean;
  layout: 'horizontal' | 'vertical';
} | null>(null);

interface DetailItemsProviderProps {
  children: JSX.Element;
  loading: boolean;
  layout: 'horizontal' | 'vertical';
}

const DetailItemsProvider = ({
  loading,
  layout,
  children,
}: DetailItemsProviderProps) => {
  return (
    <DetailItemsContext.Provider
      value={{
        loading,
        layout,
      }}
    >
      {children}
    </DetailItemsContext.Provider>
  );
};

export default DetailItemsProvider;
