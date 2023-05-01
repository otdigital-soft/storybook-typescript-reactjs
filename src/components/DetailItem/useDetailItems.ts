import { useContext } from 'react';
import { DetailItemsContext } from 'components/DetailItem/DetailItemsProvider';

const useDetailItems = () => {
  const context = useContext(DetailItemsContext);
  if (context === null) {
    throw new Error(
      'useDetailItems cannot be used outside of DetailItemsProvider',
    );
  }
  return context;
};

export default useDetailItems;
