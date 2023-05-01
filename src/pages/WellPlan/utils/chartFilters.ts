export type ChartFiltersState = Record<
  string,
  boolean | Record<number, boolean>
> & {
  emissionReductionInitiatives: Record<number, boolean>;
};

export type ChartFiltersAction<S extends ChartFiltersState> =
  | { type: 'toggleFilter'; filter: keyof Omit<S, 'emps'> }
  | {
      type: 'toggleEmissionReductionInitiativeFilter';
      emissionReductionInitiativeId: number;
    };

export function chartFiltersReducer<S extends ChartFiltersState>(
  state: S,
  action: ChartFiltersAction<S>,
) {
  switch (action.type) {
    case 'toggleFilter':
      return {
        ...state,
        [action.filter]: !state[action.filter],
      };
    case 'toggleEmissionReductionInitiativeFilter':
      return {
        ...state,
        emissionReductionInitiatives: {
          ...state.emissionReductionInitiatives,
          [action.emissionReductionInitiativeId]:
            !state.emissionReductionInitiatives[
              action.emissionReductionInitiativeId
            ],
        },
      };
    default:
      throw new Error('Unknown action');
  }
}
