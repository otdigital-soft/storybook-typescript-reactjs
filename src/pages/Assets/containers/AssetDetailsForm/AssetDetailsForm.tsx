import { Title } from 'components/Typography';
import Box, { Flexbox } from 'components/Box';
import { useFormikContext } from 'formik';
import { ASSET_TYPE_OPTIONS, FormValues } from './form';
import { Alert, Form, Col } from 'antd';
import Button from 'components/Button';
import { Row } from 'components/Grid';
import { LABELS as labels } from './form';
import { prettyPlaceholder } from 'utils/format';
import FormInput from 'components/FormInput';
import FormSelect from 'components/FormSelect';
import { STATUS_OPTIONS } from '../../form';
import routes from 'routes';
import { SubmitRow } from 'components/Row';
import { useNavigate } from 'react-router-dom';
import useAssetReferenceMaterial from 'pages/Assets/hooks/useAssetReferenceMaterial';
import { FileOutlined } from '@ant-design/icons';
import { isSafeToShow } from 'utils/safety';
import FormInputNumber from 'components/FormInputNumber';

interface AssetDetailsFormProps {
  disabledFields: Record<'draft', boolean>;
}

const AssetDetailsForm = ({ disabledFields }: AssetDetailsFormProps) => {
  const navigate = useNavigate();
  const { status, submitForm, isSubmitting, isValid } =
    useFormikContext<FormValues>();
  const { data: assetReferenceMaterialData } = useAssetReferenceMaterial();

  return (
    <Box>
      <Title level={4}>Asset details</Title>

      <Form layout="vertical">
        {isSafeToShow(status) ? (
          <Box marginTop={27}>
            <Alert message={status} type="error" showIcon />
          </Box>
        ) : undefined}
        <Box marginTop={29} overflowX="hidden">
          <Row gutter={70}>
            <Col span={18}>
              <Row gutter={17}>
                <>
                  <Col span={6}>
                    <FormInput<FormValues>
                      name="name"
                      formItemProps={{
                        label: labels.name,
                        required: true,
                      }}
                      inputProps={{
                        placeholder: prettyPlaceholder`Enter ${labels.name}`,
                      }}
                    />
                  </Col>
                  <Col span={6}>
                    <FormSelect<FormValues>
                      name="type"
                      formItemProps={{
                        label: labels.type,
                        required: true,
                      }}
                      options={ASSET_TYPE_OPTIONS}
                      selectInputProps={{
                        placeholder: prettyPlaceholder`Select ${labels.type}`,
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <FormInput<FormValues>
                      name="green_house_gas_class_notation"
                      formItemProps={{
                        label: labels.green_house_gas_class_notation,
                      }}
                      inputProps={{
                        placeholder: prettyPlaceholder`Enter ${labels.green_house_gas_class_notation}`,
                      }}
                    />
                  </Col>
                </>

                <>
                  <Col span={12}>
                    <FormInput<FormValues>
                      name="design_description"
                      formItemProps={{
                        label: labels.design_description,
                        required: true,
                      }}
                      inputProps={{
                        placeholder: prettyPlaceholder`Enter ${labels.design_description}`,
                      }}
                    />
                  </Col>
                </>
              </Row>
            </Col>
            <Col span={6}>
              <FormSelect<FormValues>
                name="draft"
                formItemProps={{
                  label: labels.draft,
                  required: true,
                }}
                options={STATUS_OPTIONS}
                selectInputProps={{
                  placeholder: prettyPlaceholder`Select ${labels.draft}`,
                  disabled: disabledFields.draft,
                }}
              />
            </Col>
          </Row>
        </Box>
        <Box marginTop={32}>
          <Title level={4}>External energy supply input</Title>
          <Box marginTop={6}>
            <Title level={5} fontWeight={400}>
              EPA Scope 2 - Indirect
            </Title>
          </Box>
          <Box marginTop={24}>
            <Box display="flex" gap={17}>
              <Box width="20%">
                <FormInput
                  name="external_energy_supply.type"
                  formItemProps={{
                    label: labels.external_energy_supply.type,
                    required: true,
                    labelEllipsis: true,
                  }}
                  inputProps={{
                    placeholder: prettyPlaceholder`Enter ${labels.external_energy_supply.type}`,
                  }}
                />
              </Box>
              <Box width="20%">
                <FormInputNumber
                  name="external_energy_supply.capacity"
                  formItemProps={{
                    label: labels.external_energy_supply.capacity,
                    required: true,
                    labelEllipsis: true,
                  }}
                  inputNumberProps={{
                    placeholder: prettyPlaceholder`Enter ${labels.external_energy_supply.capacity}`,
                  }}
                />
              </Box>
              <Box width="20%">
                <FormInputNumber
                  name="external_energy_supply.co2"
                  formItemProps={{
                    label: labels.external_energy_supply.co2,
                    required: true,
                    labelEllipsis: true,
                  }}
                  inputNumberProps={{
                    placeholder: prettyPlaceholder`Enter ${labels.external_energy_supply.co2}`,
                  }}
                />
              </Box>
              <Box width="20%">
                <FormInputNumber
                  name="external_energy_supply.generator_efficiency_factor"
                  formItemProps={{
                    label:
                      labels.external_energy_supply.generator_efficiency_factor,
                    required: true,
                    labelEllipsis: true,
                  }}
                  inputNumberProps={{
                    placeholder: prettyPlaceholder`Enter ${labels.external_energy_supply.generator_efficiency_factor}`,
                  }}
                />
              </Box>
              <Box width="20%">
                <FormInputNumber
                  name="external_energy_supply.nox"
                  formItemProps={{
                    label: labels.external_energy_supply.nox,
                    required: true,
                    labelEllipsis: true,
                  }}
                  inputNumberProps={{
                    placeholder: prettyPlaceholder`Enter ${labels.external_energy_supply.nox}`,
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Form>
      <SubmitRow>
        {assetReferenceMaterialData?.details ? (
          <Flexbox flexGrow={1}>
            <Button
              onClick={() => window.open(assetReferenceMaterialData.details)}
              icon={<FileOutlined />}
            >
              View reference material
            </Button>
          </Flexbox>
        ) : null}
        <Button onClick={() => navigate(routes.assets)}>Cancel</Button>
        <Button
          onClick={submitForm}
          type="primary"
          disabled={!isValid || isSubmitting}
        >
          Save
        </Button>
      </SubmitRow>
    </Box>
  );
};

export default AssetDetailsForm;
