import { createContext, Dispatch, useReducer } from 'react';

export enum AddEditAction {
  Add = 'Add',
  Edit = 'Edit',
}

export const AddEditActionsContext = createContext<
  [State, Dispatch<Action>] | null
>(null);

interface AddEditActionsProviderProps {
  children?: JSX.Element;
}

type State = Record<
  string,
  | {
      selectedRows: number[];
      action: AddEditAction | undefined;
      editedRow: number | undefined;
    }
  | undefined
>;

type Action =
  | {
      type: 'setSelectedRows';
      selectedRows: number[];
      context: string;
    }
  | {
      type: 'setAction';
      action: AddEditAction | undefined;
      context: string;
    }
  | {
      type: 'setEditedRow';
      editedRow: number | undefined;
      context: string;
    }
  | {
      type: 'initContext';
      context: string;
    };

export function reducer(state: State, action: Action): State {
  const contextState = state[action.context];
  switch (action.type) {
    case 'initContext':
      return {
        ...state,
        [action.context]: contextState
          ? contextState
          : {
              selectedRows: [],
              action: undefined,
              editedRow: undefined,
            },
      };
    case 'setSelectedRows':
      if (!contextState) {
        return state;
      }
      return {
        ...state,
        [action.context]: {
          ...contextState,
          selectedRows: action.selectedRows,
        },
      };
    case 'setEditedRow':
      if (!contextState) {
        return state;
      }
      return {
        ...state,
        [action.context]: {
          ...contextState,
          editedRow: action.editedRow,
        },
      };
    case 'setAction':
      if (!contextState) {
        return state;
      }
      return {
        ...state,
        [action.context]: {
          ...contextState,
          action: action.action,
        },
      };
    default:
      throw new Error('Unknown action');
  }
}

const AddEditActionsProvider = ({ children }: AddEditActionsProviderProps) => {
  const [state, dispatch] = useReducer(reducer, {} as State);

  return (
    <AddEditActionsContext.Provider value={[state, dispatch]}>
      {children}
    </AddEditActionsContext.Provider>
  );
};

export default AddEditActionsProvider;
