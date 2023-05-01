import { Breakpoint } from 'antd/lib/_util/responsiveObserve';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const useBreakpointValue = <T extends string | number>(
  values: Partial<Record<Breakpoint, T>>,
) => {
  const breakpoints = useBreakpoint();
  for (const size of ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'] as Breakpoint[]) {
    if (breakpoints[size] && values[size]) {
      return values[size];
    }
  }
  return undefined;
};

export default useBreakpointValue;
