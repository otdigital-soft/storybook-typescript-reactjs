import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import addDays from 'date-fns/addDays';
import fromUnixTime from 'date-fns/fromUnixTime';
import startOfDay from 'date-fns/startOfDay';
import differenceInHours from 'date-fns/differenceInHours';
import useDebounce from 'hooks/useDebounce';

interface ChartZoomProviderProps {
  children: JSX.Element;
  startDate: Date;
  endDate: Date;
}

export const ChartZoomContext = createContext<{
  xScale: { min: number; max: number } | undefined;
  xScaleDate: { min: Date; max: Date } | undefined;
  onXScaleUpdate: (min: number, max: number) => void;
  xScaleLimit: { min: number; max: number };
  xScaleTimeUnit: 'day' | 'hour';
  setXScale: Dispatch<SetStateAction<{ min: number; max: number } | undefined>>;
  setZoomLevel: Dispatch<SetStateAction<number>>;
} | null>(null);

const ChartZoomProvider = ({
  children,
  startDate,
  endDate,
}: ChartZoomProviderProps) => {
  const xScaleLimit = useMemo(() => {
    return {
      min: startDate.valueOf(),
      max: endDate.valueOf(),
    };
  }, [startDate, endDate]);
  const [xScale, setXScale] = useState<
    { min: number; max: number } | undefined
  >();
  const debouncedXScale = useDebounce(xScale, 500);
  const [zoomLevel, setZoomLevel] = useState(1);
  const debouncedZoomLevel = useDebounce(zoomLevel, 500);
  // round x scale range to whole days to reuse cached data
  const xScaleDate = useMemo(() => {
    if (!debouncedXScale) {
      return undefined;
    }
    return {
      min: startOfDay(fromUnixTime(debouncedXScale.min / 1000)),
      max: startOfDay(addDays(fromUnixTime(debouncedXScale.max / 1000), 1)),
    };
  }, [debouncedXScale]);
  const onXScaleUpdate = useCallback((min: number, max: number) => {
    setXScale({
      min,
      max,
    });
  }, []);
  const xScaleTimeUnit = useMemo(
    () =>
      debouncedZoomLevel > 1 && debouncedXScale
        ? differenceInHours(
            fromUnixTime(debouncedXScale.max / 1000),
            fromUnixTime(debouncedXScale.min / 1000),
          ) <= 48
          ? ('hour' as const)
          : ('day' as const)
        : ('day' as const),
    [debouncedXScale, debouncedZoomLevel],
  );

  const value = {
    onXScaleUpdate,
    xScale,
    xScaleLimit,
    xScaleTimeUnit,
    setXScale,
    xScaleDate,
    setZoomLevel,
  };
  return (
    <ChartZoomContext.Provider value={value}>
      {children}
    </ChartZoomContext.Provider>
  );
};

export default ChartZoomProvider;
