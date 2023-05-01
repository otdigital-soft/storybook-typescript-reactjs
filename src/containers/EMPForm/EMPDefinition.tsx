import { Button, Col, Row } from 'antd';
import Box, { Flexbox } from 'components/Box';
import FormDatePicker from 'components/FormDatePicker';
import FormInput from 'components/FormInput';
import FormInputNumber from 'components/FormInputNumber';
import FormTextArea from 'components/FormTextArea';
import { Text } from 'components/Typography';
import { toLowerCaseFirstLetter } from 'utils/format';
import { FormValues, labels } from './EMPBaseForm';

interface EMPDefinitionProps {
  onClear?: () => void;
}

const EMPDefinition = ({ onClear }: EMPDefinitionProps) => {
  return (
    <Box>
      <Text strong type="secondary">
        EMP Definition
      </Text>
      <Box marginTop={8}>
        <Row gutter={35}>
          <Col span={6}>
            <FormInput<FormValues>
              name="name"
              formItemProps={{
                label: labels.name,
              }}
              inputProps={{
                placeholder: `Enter ${labels.name}`,
              }}
            />
          </Col>
          <Col span={18}>
            <Flexbox>
              <Box flexGrow={1}>
                <FormTextArea<FormValues>
                  name="description"
                  formItemProps={{
                    label: labels.description,
                  }}
                  textAreaProps={{
                    placeholder: `Enter ${labels.description}`,
                    rows: 4,
                  }}
                />
              </Box>
              {onClear ? (
                <Box marginLeft={27} marginTop={30} flexShrink={0}>
                  <Button type="primary" danger onClick={onClear}>
                    Clear data
                  </Button>
                </Box>
              ) : null}
            </Flexbox>
          </Col>
          <Col span={6}>
            <FormDatePicker<FormValues>
              name="start_date"
              formItemProps={{
                label: labels.start_date,
              }}
              datePickerProps={{
                placeholder: `Enter ${toLowerCaseFirstLetter(
                  labels.start_date,
                )}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormDatePicker<FormValues>
              name="end_date"
              formItemProps={{
                label: labels.end_date,
              }}
              datePickerProps={{
                placeholder: `Enter ${toLowerCaseFirstLetter(labels.end_date)}`,
              }}
            />
          </Col>
          <Col span={12} />
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="total_rig_baseline_average"
              formItemProps={{
                label: labels.total_rig_baseline_average,
              }}
              inputNumberProps={{
                placeholder: `Enter ${toLowerCaseFirstLetter(
                  labels.total_rig_baseline_average,
                )}`,
              }}
            />
          </Col>
          <Col span={6}>
            <FormInputNumber<FormValues>
              name="total_rig_target_average"
              formItemProps={{
                label: labels.total_rig_target_average,
              }}
              inputNumberProps={{
                placeholder: `Enter ${toLowerCaseFirstLetter(
                  labels.total_rig_target_average,
                )}`,
              }}
            />
          </Col>
          <Col span={12}>
            <FormTextArea<FormValues>
              name="api_description"
              formItemProps={{
                label: labels.api_description,
              }}
              textAreaProps={{
                placeholder: `Enter ${labels.api_description}`,
                rows: 4,
              }}
            />
          </Col>
        </Row>
      </Box>
    </Box>
  );
};

export default EMPDefinition;
