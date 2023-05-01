import { ColumnsType } from 'antd/es/table/interface';
import FormCheckbox from 'components/FormCheckbox';
import FormInputNumber from 'components/FormInputNumber';
import FormSelect from 'components/FormSelect';
import { useFormikContext } from 'formik';
import { MATERIAL_CATEGORY_OPTIONS } from 'pages/Assets/pages/AssetList/containers/MaterialTypeForm';
import {
  MaterialFormValues,
  FormValues,
  MATERIAL_LABELS as labels,
} from 'pages/Wells/containers/PhaseForm';
import MaterialTypeFormSelect from 'pages/Wells/containers/PhaseForm/MaterialTypeFormSelect';
import { useCallback, useMemo } from 'react';
import useAllMaterialTypes from '../../../WellPlan/hooks/useAllMaterialTypes';
import { MinusOutlined } from '@ant-design/icons';
import { prettyPlaceholder } from 'utils/format';
import { RemoveMaterialButton } from 'pages/Wells/containers/PhaseMaterials';

const usePhaseMaterialsColumns = () => {
  const { values: phaseFormValues, setFieldValue: setPhaseFormFieldValue } =
    useFormikContext<FormValues>();

  const addMaterial = useCallback(() => {
    setPhaseFormFieldValue('materials', [
      ...phaseFormValues.materials,
      {
        material_category: null,
        material_type: null,
        quantity: null,
        quota: false,
      },
    ]);
  }, [setPhaseFormFieldValue, phaseFormValues.materials]);

  const removeMaterial = useCallback(
    (materialIndex: number) => {
      setPhaseFormFieldValue('materials', [
        ...phaseFormValues.materials.filter(
          (_, index) => index !== materialIndex,
        ),
      ]);
    },
    [setPhaseFormFieldValue, phaseFormValues.materials],
  );

  const { data: allMaterialTypes } = useAllMaterialTypes();

  const columns: ColumnsType<MaterialFormValues> = useMemo(
    () => [
      {
        title: 'Material category',
        width: 130,
        key: 'materialCategory',
        render: (_, __, index) => {
          return (
            <FormSelect
              name={`materials[${index}].material_category`}
              options={MATERIAL_CATEGORY_OPTIONS}
              selectInputProps={{
                placeholder: prettyPlaceholder`Select ${labels.material_category}`,
              }}
            />
          );
        },
      },
      {
        title: 'Material type',
        width: 130,
        key: 'materialType',
        render: (_, __, index) => {
          return (
            <MaterialTypeFormSelect
              materialTypeName={`materials[${index}].material_type`}
              materialCategoryName={`materials[${index}].material_category`}
              selectInputProps={{
                placeholder: prettyPlaceholder`Select ${labels.material_type}`,
              }}
            />
          );
        },
      },
      {
        title: 'Quantity',
        width: 100,
        key: 'quantity',
        render: (_, __, index) => {
          return (
            <FormInputNumber
              name={`materials[${index}].quantity`}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.quantity}`,
              }}
            />
          );
        },
      },
      {
        title: 'Unit',
        width: 80,
        key: 'unit',
        render: (material) => {
          return allMaterialTypes?.find(
            (materialType) => materialType.id === material.material_type,
          )?.unit;
        },
        className: 'ant-table-cell-unit',
      },
      {
        title: 'Quota',
        width: 60,
        align: 'center',
        key: 'quota',
        render: (_, __, index) => {
          return <FormCheckbox name={`materials[${index}].quota`} />;
        },
        className: 'ant-table-cell-quota',
      },
      {
        width: 40,
        key: 'remove',
        render: (_, __, index) => {
          return (
            <RemoveMaterialButton
              size="small"
              icon={<MinusOutlined />}
              onClick={() => removeMaterial(index)}
            />
          );
        },
        className: 'ant-table-cell-remove',
      },
    ],
    [allMaterialTypes, removeMaterial],
  );

  return {
    columns,
    addMaterial,
  };
};

export default usePhaseMaterialsColumns;
