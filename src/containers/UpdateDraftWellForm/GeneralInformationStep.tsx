import Box from 'components/Box';
import { Title } from 'components/Typography';
import GeneralForm from 'containers/UpdateWellForm/GeneralForm';
import { FormValues } from 'containers/UpdateWellForm/types';
import { WELL_LABELS as labels } from 'consts/wells';
import { toLowerCaseFirstLetter } from 'utils/format';
import FormInput from 'components/FormInput';

const GeneralInformationStep = () => {
  return (
    <>
      <Box mb={20}>
        <Title level={5} type="secondary">
          General information
        </Title>
      </Box>

      <FormInput<FormValues>
        name="name"
        formItemProps={{
          label: labels.name,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(labels.name)}`,
        }}
      />
      <GeneralForm />
    </>
  );
};

export default GeneralInformationStep;
