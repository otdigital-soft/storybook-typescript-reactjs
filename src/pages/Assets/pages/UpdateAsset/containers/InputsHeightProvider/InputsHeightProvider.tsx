import { createContext } from 'react';

export const InputsHeightContext = createContext<number | null>(null);

type InputsHeightProviderProps = {
  children: JSX.Element;
  height: number | null;
};

const InputsHeightProvider = ({
  children,
  height,
}: InputsHeightProviderProps) => {
  return (
    <InputsHeightContext.Provider value={height}>
      {children}
    </InputsHeightContext.Provider>
  );
};

export default InputsHeightProvider;
