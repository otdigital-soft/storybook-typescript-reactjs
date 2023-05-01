import { GENERATED_REPORT_EVENT_NAME } from 'pages/WellPlan/consts';
import { createContext, Dispatch, useEffect, useReducer } from 'react';

interface ReportProviderProps {
  children: JSX.Element;
  dispatchEvents?: boolean;
}

export const ReportProviderContext = createContext<Dispatch<Action> | null>(
  null,
);

export type State = {
  co2: boolean;
  baseline: boolean;
  target: boolean;
  timeline: boolean;
};

export type Action = { type: 'completedChart'; chart: keyof State };

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'completedChart':
      return {
        ...state,
        [action.chart]: true,
      };
    default:
      throw new Error('Unknown action');
  }
}

let isEventSent = false;

const ReportProvider = ({ children, dispatchEvents }: ReportProviderProps) => {
  const initialState: State = {
    co2: false,
    timeline: false,
    baseline: false,
    target: false,
  };
  const [renderedCharts, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (
      dispatchEvents &&
      !isEventSent &&
      Object.values(renderedCharts).every((chart) => !!chart)
    ) {
      const event = new CustomEvent(GENERATED_REPORT_EVENT_NAME);
      window.parent.document.dispatchEvent(event);
      isEventSent = true;
    }
  }, [dispatchEvents, renderedCharts]);

  return (
    <ReportProviderContext.Provider value={dispatch}>
      {children}
    </ReportProviderContext.Provider>
  );
};

export default ReportProvider;
