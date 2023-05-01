import { Alert, Col, Form, InputNumber } from 'antd';
import Box, { Flexbox } from 'components/Box';
import FormInput from 'components/FormInput';
import FormSelect from 'components/FormSelect';
import FormTextArea from 'components/FormTextArea';
import { Row } from 'components/Grid';
import { Title, Text } from 'components/Typography';
import { useFormikContext } from 'formik';
import useCompleteAssets from 'hooks/useCompleteAssets';
import { prettyNumber, prettyPlaceholder } from 'utils/format';
import {
  FormValues,
  LABELS as labels,
  WELL_TYPE_OPTIONS,
} from 'pages/Wells/containers/WellDetailsForm';
import { ASSET_TYPE_NAME_MAP } from 'pages/Assets/consts';
import { isSafeToShow } from 'utils/safety';
import FormInputNumber from 'components/FormInputNumber';
import useWellNames from 'pages/Wells/hooks/useWellNames';
import AddWellNameModal from '../AddWellNameModal';
import {
  AddEditSelectProvider,
  useAddEditSelect,
} from 'components/AddEditSelect';
import FormAddEditSelect from 'components/FormAddEditSelect';

interface WellDetailsFormProps {
  disabledFields?: Partial<Record<keyof FormValues, boolean>>;
}

const WellDetailsForm = ({ disabledFields }: WellDetailsFormProps) => {
  const { status, values } = useFormikContext<FormValues>();
  const { data: assetsData } = useCompleteAssets();
  const { data: wellNamesData } = useWellNames();
  const selectedAsset = assetsData?.find((asset) => asset.id === values.asset);
  const { onAdd } = useAddEditSelect();

  return (
    <>
      <Form layout="vertical">
        <Box marginBottom={18}>
          <Title level={5}>Well emission description</Title>
        </Box>
        {isSafeToShow(status) ? (
          <Box marginBottom={18}>
            <Alert message={status} type="error" showIcon />
          </Box>
        ) : undefined}
        <Row gutter={36}>
          <>
            <Col span={6}>
              <FormAddEditSelect<FormValues>
                name="name"
                formItemProps={{
                  label: labels.name,
                  required: true,
                }}
                options={(wellNamesData || []).map((wellName) => ({
                  value: wellName.id,
                  label: wellName.name,
                }))}
                addEditSelectInputProps={{
                  placeholder: prettyPlaceholder`Select ${labels.name}`,
                  disabled: disabledFields?.name,
                  addNewLabel: 'Add a new well',
                  onAdd,
                }}
              />
            </Col>
            <Col span={6}>
              <FormInput<FormValues>
                name="sidetrack"
                formItemProps={{
                  label: labels.sidetrack,
                  required: true,
                }}
                inputProps={{
                  placeholder: prettyPlaceholder`Enter ${labels.sidetrack}`,
                  disabled: disabledFields?.sidetrack,
                }}
              />
            </Col>
            <Col span={12} />
          </>

          <>
            <Col span={12}>
              <FormTextArea<FormValues>
                name="description"
                formItemProps={{
                  label: labels.description,
                }}
                textAreaProps={{
                  placeholder: prettyPlaceholder`Enter ${labels.description}`,
                  rows: 3,
                  disabled: disabledFields?.description,
                }}
              />
            </Col>
            <Col span={12} />
          </>

          <>
            <Col span={6}>
              <FormInput<FormValues>
                name="field"
                formItemProps={{
                  label: labels.field,
                  required: true,
                }}
                inputProps={{
                  placeholder: prettyPlaceholder`Enter ${labels.field}`,
                  disabled: disabledFields?.field,
                }}
              />
            </Col>
            <Col span={6}>
              <FormInput<FormValues>
                name="location"
                formItemProps={{
                  label: labels.location,
                  required: true,
                }}
                inputProps={{
                  placeholder: prettyPlaceholder`Enter ${labels.location}`,
                  disabled: disabledFields?.location,
                }}
              />
            </Col>
            <Col span={12} />
          </>

          <>
            <Col span={6}>
              <FormSelect<FormValues>
                name="type"
                formItemProps={{
                  label: labels.type,
                  required: true,
                }}
                options={WELL_TYPE_OPTIONS}
                selectInputProps={{
                  placeholder: prettyPlaceholder`Select ${labels.type}`,
                  disabled: disabledFields?.type,
                }}
              />
            </Col>
            <Col span={18} />
          </>
        </Row>

        <Box marginBottom={8}>
          <Title level={5} fontWeight={400}>
            Asset
          </Title>
        </Box>

        <Row gutter={36}>
          <>
            <Col span={6}>
              <FormSelect<FormValues>
                name="asset"
                formItemProps={{
                  label: labels.asset,
                  required: true,
                }}
                options={(assetsData || []).map((asset) => ({
                  value: asset.id,
                  label: asset.name,
                }))}
                selectInputProps={{
                  placeholder: prettyPlaceholder`Select ${labels.asset}`,
                  disabled: disabledFields?.asset,
                }}
              />
            </Col>
            <Col span={6}>
              {selectedAsset ? (
                <Flexbox flexDirection="column">
                  <Text>
                    Active Baseline:{' '}
                    <Text strong>{selectedAsset.active_baseline}</Text>
                  </Text>
                  {selectedAsset.active_emission_management_plan ? (
                    <Text>
                      Active EMP:{' '}
                      <Text strong>
                        {selectedAsset.active_emission_management_plan}
                      </Text>
                    </Text>
                  ) : null}
                  <Text>
                    Asset type:{' '}
                    <Text strong>
                      {ASSET_TYPE_NAME_MAP[selectedAsset.type]}
                    </Text>
                  </Text>
                  <Text>
                    Asset name: <Text strong>{selectedAsset.name}</Text>
                  </Text>
                </Flexbox>
              ) : null}
            </Col>
            <Col span={12} />
          </>
        </Row>

        <Box marginBottom={8}>
          <Title level={5} fontWeight={400}>
            Asset fuel
          </Title>
        </Box>

        <Row gutter={36}>
          <>
            <Col span={6}>
              <FormInput<FormValues>
                name="fuel_type"
                formItemProps={{
                  label: labels.fuel_type,
                  required: true,
                }}
                inputProps={{
                  placeholder: prettyPlaceholder`Enter ${labels.fuel_type}`,
                  disabled: disabledFields?.fuel_type,
                }}
              />
            </Col>
            <Col span={6}>
              <FormInputNumber<FormValues>
                name="fuel_density"
                formItemProps={{
                  label: labels.fuel_density,
                  required: true,
                }}
                inputNumberProps={{
                  placeholder: prettyPlaceholder`Enter ${labels.fuel_density}`,
                  disabled: disabledFields?.fuel_density,
                }}
              />
            </Col>
            <Col span={12} />
          </>
          <>
            <Col span={6}>
              <FormInputNumber<FormValues>
                name="co2_per_fuel"
                formItemProps={{
                  label: labels.co2_per_fuel,
                  required: true,
                }}
                inputNumberProps={{
                  placeholder: prettyPlaceholder`Enter ${labels.co2_per_fuel}`,
                  disabled: disabledFields?.co2_per_fuel,
                }}
              />
            </Col>
            <Col span={6}>
              <FormInputNumber<FormValues>
                name="nox_per_fuel"
                formItemProps={{
                  label: labels.nox_per_fuel,
                  required: true,
                }}
                inputNumberProps={{
                  placeholder: prettyPlaceholder`Enter ${labels.nox_per_fuel}`,
                  disabled: disabledFields?.nox_per_fuel,
                }}
              />
            </Col>
            <Col span={12} />
          </>
          <>
            <Col span={6}>
              <FormInputNumber<FormValues>
                name="co2_tax"
                formItemProps={{
                  label: labels.co2_tax,
                  required: true,
                }}
                inputNumberProps={{
                  placeholder: prettyPlaceholder`Enter ${labels.co2_tax}`,
                  disabled: disabledFields?.co2_tax,
                }}
              />
            </Col>
            <Col span={6}>
              <FormInputNumber<FormValues>
                name="nox_tax"
                formItemProps={{
                  label: labels.nox_tax,
                  required: true,
                }}
                inputNumberProps={{
                  placeholder: `Enter ${labels.nox_tax}`,
                  disabled: disabledFields?.nox_tax,
                }}
              />
            </Col>
            <Col span={6}>
              <FormInputNumber<FormValues>
                name="fuel_cost"
                formItemProps={{
                  label: labels.fuel_cost,
                  required: true,
                }}
                inputNumberProps={{
                  placeholder: prettyPlaceholder`Enter ${labels.fuel_cost}`,
                  disabled: disabledFields?.fuel_cost,
                }}
              />
            </Col>
            <Col span={6}>
              <Form.Item label={labels.total_fuel_cost}>
                <InputNumber
                  formatter={prettyNumber}
                  disabled={true}
                  value={(
                    Number(values.fuel_cost) +
                    Number(values.co2_tax) +
                    Number(values.nox_tax)
                  ).toFixed(2)}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </>
        </Row>
        <Box marginBottom={8}>
          <Title level={5} fontWeight={400}>
            Boilers
          </Title>
        </Box>

        <Row gutter={36}>
          <>
            <Col span={6}>
              <FormInputNumber<FormValues>
                name="boilers_co2_per_fuel"
                formItemProps={{
                  label: labels.boilers_co2_per_fuel,
                  required: true,
                }}
                inputNumberProps={{
                  placeholder: prettyPlaceholder`Enter ${labels.boilers_co2_per_fuel}`,
                  disabled: disabledFields?.boilers_co2_per_fuel,
                }}
              />
            </Col>
            <Col span={6}>
              <FormInputNumber<FormValues>
                name="boilers_nox_per_fuel"
                formItemProps={{
                  label: labels.boilers_nox_per_fuel,
                  required: true,
                }}
                inputNumberProps={{
                  placeholder: prettyPlaceholder`Enter ${labels.boilers_nox_per_fuel}`,
                  disabled: disabledFields?.boilers_nox_per_fuel,
                }}
              />
            </Col>
            <Col span={12} />
          </>
        </Row>
      </Form>
      <AddWellNameModal />
    </>
  );
};

const DefaultWellDetailsForm = (props: WellDetailsFormProps) => {
  return (
    <AddEditSelectProvider>
      <WellDetailsForm {...props} />
    </AddEditSelectProvider>
  );
};

export default DefaultWellDetailsForm;
