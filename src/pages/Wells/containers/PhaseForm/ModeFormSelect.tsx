import FormSelect from 'components/FormSelect';
import { FormSelectProps } from 'components/FormSelect/FormSelect';
import { useField } from 'formik';
import useWellPlanOptions from 'pages/WellPlan/hooks/useWellPlanOptions';
import { useEffect, useMemo } from 'react';

type ModeFormSelectProps<T> = Omit<FormSelectProps<T>, 'options' | 'name'> & {
  modeName: string;
  phaseName: string;
};

const ModeFormSelect = <FormFields extends Record<string, unknown>>({
  selectInputProps,
  modeName,
  phaseName,
  ...props
}: ModeFormSelectProps<FormFields>) => {
  const { phasesData, modesData } = useWellPlanOptions();
  const [{ value: phaseValue }] = useField(phaseName);
  const [{ value: modeValue }, , { setValue: setModeValue }] =
    useField(modeName);

  const selectedPhase = useMemo(
    () => phasesData?.find((phaseData) => phaseData.id === phaseValue),
    [phasesData, phaseValue],
  );

  const selectedMode = useMemo(
    () => modesData?.find((modeData) => modeData.id === modeValue),
    [modesData, modeValue],
  );

  const modeOptions = useMemo(() => {
    const modes = selectedPhase?.transit
      ? modesData?.filter((modeData) => modeData.transit)
      : modesData?.filter((modeData) => !modeData.transit);
    return (
      modes?.map((modeData) => ({
        label: modeData.name,
        value: modeData.id,
      })) ?? []
    );
  }, [selectedPhase, modesData]);

  useEffect(() => {
    if (selectedPhase?.transit && !selectedMode?.transit) {
      setModeValue(modesData?.find((modeData) => modeData.transit)?.id || null);
    }
    if (selectedPhase && !selectedPhase?.transit && selectedMode?.transit) {
      setModeValue(null);
    }
  }, [selectedPhase, selectedMode, modesData, phaseValue, setModeValue]);

  return (
    <FormSelect<FormFields>
      name={modeName}
      options={modeOptions}
      selectInputProps={{
        disabled: selectedPhase?.transit ?? true,
        ...selectInputProps,
      }}
      {...props}
    />
  );
};

export default ModeFormSelect;
