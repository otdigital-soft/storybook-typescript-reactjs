import { useFormikContext } from 'formik';
import { FormValues } from '../../containers/BaselineForm';
import { useCallback } from 'react';
import {
  PhaseFormValues,
  Season,
  SeasonFormValues,
} from 'pages/Assets/pages/UpdateAsset/containers/BaselineForm/form';
import { reorder } from 'utils/reorder';
import { v4 as uuidv4 } from 'uuid';

const useUpdateBaselineInput = (tabSeason: Season) => {
  const {
    values: { summer, winter, activeSeason },
    setErrors,
    values,
    setFieldValue,
    validateForm,
    errors,
  } = useFormikContext<FormValues>();
  const tabSeasonValues = tabSeason === Season.Summer ? summer : winter;
  const seasonErrors = errors[activeSeason];
  const setNewErrors = useCallback(
    async (
      phases: number[],
      inputs: PhaseFormValues[],
      season: Season,
      seasonValues: SeasonFormValues,
    ) => {
      setErrors(
        await validateForm({
          ...values,
          [season]: {
            ...seasonValues,
            phases,
            inputs,
          },
        }),
      );
    },
    [setErrors, validateForm, values],
  );

  // Util functions for hook-inside usage
  const addPhaseToSeason = useCallback(
    (phaseId: number, season: Season, seasonValues: SeasonFormValues) => {
      if (seasonValues.phases.includes(phaseId)) {
        return;
      }
      const newInputs: PhaseFormValues[] = [
        ...seasonValues.inputs,
        {
          rowId: uuidv4(),
          modes: Array(seasonValues.modes.length)
            .fill(null)
            .map(() => ({
              value: 0,
            })),
        },
      ];
      setFieldValue(`${season}.phases`, [...seasonValues.phases, phaseId]);
      setFieldValue(`${season}.inputs`, newInputs);
    },
    [setFieldValue],
  );
  const addModeToSeason = useCallback(
    (modeId: number, season: Season, seasonValues: SeasonFormValues) => {
      if (seasonValues.modes.includes(modeId)) {
        return;
      }
      setFieldValue(`${season}.modes`, [...seasonValues.modes, modeId]);
      if (!seasonValues.inputs.length && seasonValues.phases.length) {
        // build initial matrix
        const newInputs: PhaseFormValues[] = [];
        for (const {} of seasonValues.phases) {
          newInputs.push({
            modes: [
              {
                value: 0,
              },
            ],
            rowId: uuidv4(),
          });
        }
        setFieldValue(`${season}.inputs`, newInputs);
      } else if (seasonValues.inputs.length) {
        const newInputs: PhaseFormValues[] = [...seasonValues.inputs];
        for (let i = 0; i < newInputs.length; i++) {
          newInputs[i].modes.push({
            value: 0,
          });
        }
        setFieldValue(`${season}.inputs`, newInputs);
      }
    },
    [setFieldValue],
  );
  const removePhaseFromSeason = useCallback(
    async (
      phaseIndex: number,
      season: Season,
      seasonValues: SeasonFormValues,
    ) => {
      const newPhases = [...seasonValues.phases];
      newPhases.splice(phaseIndex, 1);
      const newInputs = [...seasonValues.inputs];
      newInputs.splice(phaseIndex, 1);
      setFieldValue(`${season}.phases`, newPhases);
      setFieldValue(`${season}.inputs`, newInputs);
      await setNewErrors(newPhases, newInputs, season, seasonValues);
    },
    [setFieldValue, setNewErrors],
  );
  const removeModeFromSeason = useCallback(
    (modeIndex: number, season: Season, seasonValues: SeasonFormValues) => {
      const newModes = [...seasonValues.modes];
      newModes.splice(modeIndex, 1);
      const newInputs: PhaseFormValues[] = [];
      for (let i = 0; i < seasonValues.inputs.length; i++) {
        newInputs.push({
          ...seasonValues.inputs[i],
          modes: seasonValues.inputs[i].modes.filter(
            (value, index) => index !== modeIndex,
          ),
        });
      }
      setFieldValue(`${season}.modes`, newModes);
      setFieldValue(`${season}.inputs`, newInputs);
    },
    [setFieldValue],
  );
  const duplicatePhaseFromSeason = useCallback(
    async (
      phaseIndex: number,
      season: Season,
      seasonValues: SeasonFormValues,
    ) => {
      const newPhases = [...seasonValues.phases];
      newPhases.splice(phaseIndex + 1, 0, newPhases[phaseIndex]);
      const newInputs: PhaseFormValues[] = [...seasonValues.inputs];
      newInputs.splice(phaseIndex + 1, 0, {
        modes: newInputs[phaseIndex].modes.map((mode) => ({ ...mode })),
        rowId: uuidv4(),
      });
      setFieldValue(`${season}.phases`, newPhases);
      setFieldValue(`${season}.inputs`, newInputs);
      await setNewErrors(newPhases, newInputs, season, seasonValues);
    },
    [setFieldValue, setNewErrors],
  );
  const movePhaseFromSeason = useCallback(
    async (
      startIndex: number,
      endIndex: number,
      season: Season,
      seasonValues: SeasonFormValues,
    ) => {
      const newPhases = reorder(seasonValues.phases, startIndex, endIndex);
      const newInputs = reorder(seasonValues.inputs, startIndex, endIndex);
      setFieldValue(`${season}.phases`, newPhases);
      setFieldValue(`${season}.inputs`, newInputs);
      await setNewErrors(newPhases, newInputs, season, seasonValues);
    },
    [setFieldValue, setNewErrors],
  );

  // Functions to export
  const addPhase = useCallback(
    (phaseId: number) => {
      addPhaseToSeason(phaseId, Season.Summer, summer);
      addPhaseToSeason(phaseId, Season.Winter, winter);
    },
    [addPhaseToSeason, summer, winter],
  );

  const addMode = useCallback(
    (modeId: number) => {
      addModeToSeason(modeId, Season.Summer, summer);
      addModeToSeason(modeId, Season.Winter, winter);
    },
    [addModeToSeason, summer, winter],
  );

  const removePhase = useCallback(
    async (phaseIndex: number) => {
      await removePhaseFromSeason(phaseIndex, Season.Summer, summer);
      await removePhaseFromSeason(phaseIndex, Season.Winter, winter);
    },
    [removePhaseFromSeason, summer, winter],
  );

  const removeMode = useCallback(
    (modeIndex: number) => {
      removeModeFromSeason(modeIndex, Season.Summer, summer);
      removeModeFromSeason(modeIndex, Season.Winter, winter);
    },
    [removeModeFromSeason, summer, winter],
  );

  const duplicatePhase = useCallback(
    async (phaseIndex: number) => {
      await duplicatePhaseFromSeason(phaseIndex, Season.Summer, summer);
      await duplicatePhaseFromSeason(phaseIndex, Season.Winter, winter);
    },
    [duplicatePhaseFromSeason, summer, winter],
  );

  const movePhase = useCallback(
    async (startIndex: number, endIndex: number) => {
      await movePhaseFromSeason(startIndex, endIndex, Season.Summer, summer);
      await movePhaseFromSeason(startIndex, endIndex, Season.Winter, winter);
    },
    [movePhaseFromSeason, summer, winter],
  );

  const updatePhase = useCallback(
    (index: number, phaseValue: number) => {
      setFieldValue(`${Season.Summer}.phases[${index}]`, phaseValue);
      setFieldValue(`${Season.Winter}.phases[${index}]`, phaseValue);
    },
    [setFieldValue],
  );

  return {
    activeSeason,
    seasonValues: tabSeasonValues,
    seasonErrors,
    addPhase,
    addMode,
    removePhase,
    updatePhase,
    removeMode,
    duplicatePhase,
    movePhase,
  };
};

export default useUpdateBaselineInput;
