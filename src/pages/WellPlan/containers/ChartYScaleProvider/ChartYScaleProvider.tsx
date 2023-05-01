import { createContext, useCallback, useState } from 'react';
import { Scale } from 'chart.js';

interface ChartYScaleProviderProps {
  children: JSX.Element;
}

export const ChartYScaleContext = createContext<{
  yScalesWidths: Partial<Record<string, number>>;
  setYScale: (scale: Scale) => void;
} | null>(null);

const ChartYScaleProvider = ({ children }: ChartYScaleProviderProps) => {
  const [yScalesWidths, setYScalesWidths] = useState<Record<string, number>>(
    {},
  );
  const setYScale = useCallback((scale: Scale) => {
    setYScalesWidths((prev) =>
      prev[scale.id] === scale.width
        ? prev
        : {
            ...prev,
            [scale.id]: scale.width,
          },
    );
  }, []);

  const value = {
    yScalesWidths,
    setYScale,
  };
  return (
    <ChartYScaleContext.Provider value={value}>
      {children}
    </ChartYScaleContext.Provider>
  );
};

export default ChartYScaleProvider;
