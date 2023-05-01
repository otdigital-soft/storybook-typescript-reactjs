import { Col } from 'antd';
import { CheckboxOptionType } from 'antd/lib/checkbox/Group';
import { EmissionReductionInitiativeTypeEnum } from 'api/schema';
import Box from 'components/Box';
import FormCheckboxGroup from 'components/FormCheckboxGroup';
import { Row } from 'components/Grid';
import { Text } from 'components/Typography';
import { EMISSION_REDUCTION_INITIATIVE_TYPE_NAME_MAP } from 'pages/WellPlan/consts';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useWellPlannerEmissionReductionInitiatives from 'pages/WellPlan/hooks/useWellPlannerEmissionReductionInitiatives';
import { mapDataToOptions } from 'pages/WellPlan/utils/options';
import { StyledCheckbox } from './EmissionReductionInitiativesFormCheckboxGroup.styled';

interface EMPFormCheckboxGroupProps<T> {
  name: keyof T;
}

const EmissionReductionInitiativesFormCheckboxGroup = <
  FormValues extends Record<string, unknown>,
>({
  name,
}: EMPFormCheckboxGroupProps<FormValues>) => {
  const { wellPlanId } = useCurrentWellPlan();
  const { groupedEmissionReductionInitiativesData } =
    useWellPlannerEmissionReductionInitiatives(wellPlanId);
  return (
    <>
      <FormCheckboxGroup<FormValues> name={name}>
        <Row gutter={[13, 20]}>
          {Object.entries(groupedEmissionReductionInitiativesData).map(
            ([type, emissionReductionInitiatives]) => {
              const emissionReductionInitiativeOptions: CheckboxOptionType[] =
                emissionReductionInitiatives.map(mapDataToOptions);

              return (
                <Col span={12} key={type}>
                  <Box marginBottom={4} paddingY={3.5}>
                    <Text strong>
                      {
                        EMISSION_REDUCTION_INITIATIVE_TYPE_NAME_MAP[
                          type as EmissionReductionInitiativeTypeEnum
                        ]
                      }
                    </Text>
                  </Box>
                  {emissionReductionInitiativeOptions.map((option) => (
                    <Box key={String(option.value)}>
                      <StyledCheckbox value={option.value}>
                        {option.label}
                      </StyledCheckbox>
                    </Box>
                  ))}
                </Col>
              );
            },
          )}
        </Row>
      </FormCheckboxGroup>
    </>
  );
};

export default EmissionReductionInitiativesFormCheckboxGroup;
