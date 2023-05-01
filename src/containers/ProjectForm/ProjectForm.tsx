import { DollarOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Form } from 'antd';
import Box from 'components/Box';
import FormInput from 'components/FormInput';
import FormInputNumber from 'components/FormInputNumber';
import FormTextArea from 'components/FormTextArea';
import { Row } from 'components/Grid';
import { Title } from 'components/Typography';
import { PROJECT_LABELS as labels } from 'consts/projects';
import { useFormikContext } from 'formik';
import { prettyPlaceholder, toLowerCaseFirstLetter } from 'utils/format';
import { FormValues } from './form';

interface ProjectFormProps {
  children?: JSX.Element;
  onClear?: () => void;
}

const ProjectForm = ({ children, onClear }: ProjectFormProps) => {
  const { status } = useFormikContext();

  return (
    <Form layout="vertical">
      {status ? (
        <Box mb="10px">
          <Alert message={status} type="error" showIcon />
        </Box>
      ) : undefined}
      <Box>
        <Box marginBottom={8}>
          <Title level={5} type="secondary">
            General
          </Title>
        </Box>

        <Box display={onClear ? 'flex' : 'block'}>
          <Row gutter={35} flexGrow={1}>
            <Col span={6}>
              <FormInput<FormValues>
                name="name"
                formItemProps={{
                  label: labels.name,
                }}
                inputProps={{
                  placeholder: prettyPlaceholder`Enter ${labels.name}`,
                }}
              />
            </Col>
            <Col span={18}>
              <FormTextArea<FormValues>
                name="description"
                formItemProps={{
                  label: labels.description,
                }}
                textAreaProps={{
                  placeholder: prettyPlaceholder`Enter ${labels.description}`,
                  rows: 4,
                }}
              />
            </Col>
          </Row>
          {onClear ? (
            <Box marginLeft={27} marginTop={30} flexShrink={0}>
              <Button type="primary" danger onClick={onClear}>
                Clear data
              </Button>
            </Box>
          ) : null}
        </Box>
      </Box>
      <Box>
        <Box marginBottom={8}>
          <Title level={5} type="secondary">
            Tug
          </Title>
        </Box>
        <Row gutter={35}>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="tugs_day_rate"
              formItemProps={{
                label: labels.tugs_day_rate,
              }}
              inputNumberProps={{
                placeholder: `Enter ${labels.tugs_day_rate}`,
                addonAfter: <DollarOutlined />,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="tugs_avg_move_fuel_consumption"
              formItemProps={{
                label: labels.tugs_avg_move_fuel_consumption,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.tugs_avg_move_fuel_consumption}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="tugs_avg_transit_fuel_consumption"
              formItemProps={{
                label: labels.tugs_avg_transit_fuel_consumption,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.tugs_avg_transit_fuel_consumption}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="tugs_move_speed"
              formItemProps={{
                label: labels.tugs_move_speed,
              }}
              inputNumberProps={{
                placeholder: `Enter ${labels.tugs_move_speed}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="tugs_transit_speed"
              formItemProps={{
                label: labels.tugs_transit_speed,
              }}
              inputNumberProps={{
                placeholder: `Enter ${labels.tugs_transit_speed}`,
              }}
            />
          </Col>
        </Row>
      </Box>
      <Box>
        <Box marginBottom={8}>
          <Title level={5} type="secondary">
            AHV
          </Title>
        </Box>
        <Row gutter={35}>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="ahv_no_used"
              formItemProps={{
                label: labels.ahv_no_used,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.ahv_no_used}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="ahv_no_days_per_location"
              formItemProps={{
                label: labels.ahv_no_days_per_location,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.ahv_no_days_per_location}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="ahv_avg_fuel_consumption"
              formItemProps={{
                label: labels.ahv_avg_fuel_consumption,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.ahv_avg_fuel_consumption}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="ahv_day_rate"
              formItemProps={{
                label: labels.ahv_day_rate,
              }}
              inputNumberProps={{
                placeholder: `Enter ${labels.ahv_day_rate}`,
                addonAfter: <DollarOutlined />,
              }}
            />
          </Col>
        </Row>
      </Box>
      <Box>
        <Box marginBottom={8}>
          <Title level={5} type="secondary">
            PSV
          </Title>
        </Box>
        <Row gutter={35}>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="psv_calls_per_week"
              formItemProps={{
                label: labels.psv_calls_per_week,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.psv_calls_per_week}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInput<FormValues>
              name="psv_types"
              formItemProps={{
                label: labels.psv_types,
              }}
              inputProps={{
                placeholder: prettyPlaceholder`Enter ${labels.psv_types}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="psv_avg_fuel_transit_consumption"
              formItemProps={{
                label: labels.psv_avg_fuel_transit_consumption,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.psv_avg_fuel_transit_consumption}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="psv_avg_fuel_dp_consumption"
              formItemProps={{
                label: labels.psv_avg_fuel_dp_consumption,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.psv_avg_fuel_dp_consumption}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="psv_day_rate"
              formItemProps={{
                label: labels.psv_day_rate,
              }}
              inputNumberProps={{
                placeholder: `Enter ${labels.psv_day_rate}`,
                addonAfter: <DollarOutlined />,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="psv_speed"
              formItemProps={{
                label: labels.psv_speed,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.psv_speed}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="psv_loading_time"
              formItemProps={{
                label: labels.psv_loading_time,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.psv_loading_time}`,
              }}
            />
          </Col>
        </Row>
      </Box>
      <Box>
        <Box marginBottom={8}>
          <Title level={5} type="secondary">
            Helicopter
          </Title>
        </Box>
        <Row gutter={35}>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="helicopter_no_flights_per_week"
              formItemProps={{
                label: labels.helicopter_no_flights_per_week,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.helicopter_no_flights_per_week}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInput<FormValues>
              name="helicopter_types"
              formItemProps={{
                label: labels.helicopter_types,
              }}
              inputProps={{
                placeholder: prettyPlaceholder`Enter ${labels.helicopter_types}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="helicopter_avg_fuel_consumption"
              formItemProps={{
                label: labels.helicopter_avg_fuel_consumption,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.helicopter_avg_fuel_consumption}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="helicopter_rate_per_trip"
              formItemProps={{
                label: labels.helicopter_rate_per_trip,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.helicopter_rate_per_trip}`,
                addonAfter: <DollarOutlined />,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="helicopter_cruise_speed"
              formItemProps={{
                label: labels.helicopter_cruise_speed,
              }}
              inputNumberProps={{
                placeholder: prettyPlaceholder`Enter ${labels.helicopter_cruise_speed}`,
              }}
            />
          </Col>
        </Row>
      </Box>
      <Box>
        <Box marginBottom={8}>
          <Title level={5} type="secondary">
            Fuel and emission
          </Title>
        </Box>
        <Row gutter={35}>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="helicopter_fuel_price"
              formItemProps={{
                label: labels.helicopter_fuel_price,
              }}
              inputNumberProps={{
                placeholder: `Enter ${toLowerCaseFirstLetter(
                  labels.helicopter_fuel_price,
                )}`,
                addonAfter: <DollarOutlined />,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="psv_fuel_price"
              formItemProps={{
                label: labels.psv_fuel_price,
              }}
              inputNumberProps={{
                placeholder: `Enter ${toLowerCaseFirstLetter(
                  labels.psv_fuel_price,
                )}`,
                addonAfter: <DollarOutlined />,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="marine_diesel_oil_price"
              formItemProps={{
                label: labels.marine_diesel_oil_price,
              }}
              inputNumberProps={{
                placeholder: `Enter ${toLowerCaseFirstLetter(
                  labels.marine_diesel_oil_price,
                )}`,
                addonAfter: <DollarOutlined />,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="co2_tax"
              formItemProps={{
                label: labels.co2_tax,
              }}
              inputNumberProps={{
                placeholder: `Enter ${labels.co2_tax}`,
                addonAfter: <DollarOutlined />,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="nox_tax"
              formItemProps={{
                label: labels.nox_tax,
              }}
              inputNumberProps={{
                placeholder: `Enter ${labels.nox_tax}`,
                addonAfter: <DollarOutlined />,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="fuel_total_price"
              formItemProps={{
                label: labels.fuel_total_price,
              }}
              inputNumberProps={{
                placeholder: `Enter ${toLowerCaseFirstLetter(
                  labels.fuel_total_price,
                )}`,
                addonAfter: <DollarOutlined />,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="fuel_density"
              formItemProps={{
                label: labels.fuel_density,
              }}
              inputNumberProps={{
                placeholder: `Enter ${toLowerCaseFirstLetter(
                  labels.fuel_density,
                )}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="co2_emission_per_tonne_fuel"
              formItemProps={{
                label: labels.co2_emission_per_tonne_fuel,
              }}
              inputNumberProps={{
                placeholder: `Enter ${labels.co2_emission_per_tonne_fuel}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="co2_emission_per_m3_fuel"
              formItemProps={{
                label: labels.co2_emission_per_m3_fuel,
              }}
              inputNumberProps={{
                placeholder: `Enter ${labels.co2_emission_per_m3_fuel}`,
              }}
            />
          </Col>
        </Row>
      </Box>
      {children}
    </Form>
  );
};

export default ProjectForm;
