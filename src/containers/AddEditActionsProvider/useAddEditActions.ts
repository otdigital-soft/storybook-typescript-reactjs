import { useCallback, useContext, useEffect } from 'react';
import { AddEditAction, AddEditActionsContext } from './AddEditActionsProvider';

const useAddEditActions = <AddEditActionsContextType extends string>(
  context: AddEditActionsContextType,
) => {
  const addEditActionsContext = useContext(AddEditActionsContext);
  if (!addEditActionsContext) {
    throw new Error(
      'useAddEditActions cannot be used outside of AddEditActionsProvider',
    );
  }
  const [state, dispatch] = addEditActionsContext;

  useEffect(() => {
    dispatch({
      type: 'initContext',
      context,
    });
  }, [context, dispatch]);
  const onAddRow = useCallback(() => {
    dispatch({
      type: 'setAction',
      action: AddEditAction.Add,
      context,
    });
  }, [context, dispatch]);
  const onEditRow = useCallback(
    (rowId: number) => {
      dispatch({
        type: 'setEditedRow',
        context,
        editedRow: rowId,
      });
      dispatch({
        type: 'setAction',
        context,
        action: AddEditAction.Edit,
      });
    },
    [context, dispatch],
  );
  const onCloseDrawer = useCallback(() => {
    dispatch({
      type: 'setAction',
      context: context,
      action: undefined,
    });
    dispatch({
      type: 'setEditedRow',
      context: context,
      editedRow: undefined,
    });
  }, [context, dispatch]);
  const setSelectedRows = useCallback(
    (selectedRows: number[]) => {
      dispatch({
        type: 'setSelectedRows',
        context: context,
        selectedRows,
      });
    },
    [context, dispatch],
  );
  const onUnselectRow = useCallback(
    (rowId: number) => {
      dispatch({
        type: 'setSelectedRows',
        context: context,
        selectedRows:
          state[context]?.selectedRows.filter(
            (selectedRow) => selectedRow !== rowId,
          ) || [],
      });
    },
    [context, dispatch, state],
  );
  return {
    onAddRow,
    onEditRow,
    onCloseDrawer,
    onUnselectRow,
    setSelectedRows,
    selectedRows: state[context]?.selectedRows || [],
    action: state[context]?.action,
    editedRow: state[context]?.editedRow,
  };
};

export default useAddEditActions;
