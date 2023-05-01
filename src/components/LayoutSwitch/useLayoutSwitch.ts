import { useContext } from 'react';
import { LayoutSwitchContext } from 'components/LayoutSwitch/LayoutSwitchProvider';

const useLayoutSwitch = () => {
  const context = useContext(LayoutSwitchContext);
  if (!context) {
    throw new Error(
      'useLayoutSwitch cannot be used outside of LayoutSwitchProvider',
    );
  }
  return context;
};

export default useLayoutSwitch;
