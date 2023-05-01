import FormSelect from 'components/FormSelect';
import { FormSelectProps } from 'components/FormSelect/FormSelect';
import { useField } from 'formik';
import useAllMaterialTypes from 'pages/WellPlan/hooks/useAllMaterialTypes';
import { useEffect, useMemo } from 'react';

type MaterialTypeFormSelectProps<T> = Omit<
  FormSelectProps<T>,
  'options' | 'name'
> & {
  materialTypeName: string;
  materialCategoryName: string;
};

const MaterialTypeFormSelect = <FormFields extends Record<string, unknown>>({
  selectInputProps,
  materialTypeName,
  materialCategoryName,
  ...props
}: MaterialTypeFormSelectProps<FormFields>) => {
  const { data: allMaterialTypes } = useAllMaterialTypes();
  const [{ value: materialTypeValue }, , { setValue: setMaterialTypeValue }] =
    useField(materialTypeName);
  const [{ value: materialCategoryValue }] = useField(materialCategoryName);

  const materialCategoryTypes = useMemo(
    () =>
      allMaterialTypes?.filter(
        (materialType) => materialType.category === materialCategoryValue,
      ),
    [allMaterialTypes, materialCategoryValue],
  );
  const options = useMemo(
    () =>
      materialCategoryTypes?.map((materialCategoryType) => ({
        label: materialCategoryType.type,
        value: materialCategoryType.id,
      })) ?? [],
    [materialCategoryTypes],
  );

  useEffect(() => {
    if (
      materialTypeValue &&
      materialCategoryTypes &&
      !materialCategoryTypes.find(
        (materialCategoryType) => materialCategoryType.id === materialTypeValue,
      )
    ) {
      setMaterialTypeValue(null);
    }
  }, [
    materialTypeValue,
    materialCategoryValue,
    materialCategoryTypes,
    setMaterialTypeValue,
  ]);

  return (
    <FormSelect<FormFields>
      name={materialTypeName}
      options={options}
      selectInputProps={{
        disabled: !materialCategoryValue,
        ...selectInputProps,
      }}
      {...props}
    />
  );
};

export default MaterialTypeFormSelect;
