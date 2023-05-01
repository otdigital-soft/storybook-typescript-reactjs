import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import Logger from 'utils/logger';

function difference<T>(a: Set<T>, b: Set<T>) {
  const diff = new Set(a);
  for (const elem of b) {
    diff.delete(elem);
  }
  return diff;
}

const getStoredValues = (
  key: string,
  initialValues: Record<string, boolean>,
) => {
  const serializedColumns = localStorage.getItem(key);
  if (serializedColumns) {
    try {
      const storedColumns = JSON.parse(serializedColumns);
      const storedKeys = new Set(Object.keys(storedColumns));
      const initialKeys = new Set(Object.keys(initialValues));
      const storedValues = Object.values(storedColumns);

      if (
        storedKeys.size === initialKeys.size &&
        !difference(storedKeys, initialKeys).size &&
        !storedValues.find((value) => typeof value !== 'boolean')
      ) {
        return storedColumns;
      }
    } catch (e) {
      Logger.warn('Unable to parse stored columns', e);
    }
  }
  return initialValues;
};

const useShowColumns = <Values extends Record<string, boolean>>({
  name,
  initialValues,
}: {
  name: string;
  initialValues: Values;
}) => {
  const storageKey = useMemo(() => `columns:${name}`, [name]);
  const [values, setValues] = useState<Values>(initialValues);

  const updateValues = useCallback(
    (newValues: Values) => {
      setValues(newValues);
      localStorage.setItem(storageKey, JSON.stringify(newValues));
    },
    [storageKey],
  );

  useLayoutEffect(() => {
    const newValues = getStoredValues(storageKey, initialValues);
    updateValues(newValues);
  }, [initialValues, storageKey, updateValues]);

  const onSelectColumn = useCallback(
    (column: keyof Values, selected: boolean) => {
      const newValues = { ...values, [column]: selected };
      updateValues(newValues);
    },
    [updateValues, values],
  );

  const onSelectAllColumns = useCallback(
    (selected: boolean) => {
      const newValues = { ...values };
      for (const key of Object.keys(values)) {
        newValues[key as keyof Values] = selected as Values[keyof Values];
      }
      updateValues(newValues);
    },
    [updateValues, values],
  );

  return {
    values,
    onSelectColumn,
    onSelectAllColumns,
  };
};

export default useShowColumns;
