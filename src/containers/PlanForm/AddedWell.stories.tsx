import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddedWell from 'containers/PlanForm/AddedWell';
import { Alert, Form } from 'antd';
import { Formik } from 'formik';
import * as yup from 'yup';

export default {
  title: 'containers/PlanForm/AddedWell',
  component: AddedWell,
  argTypes: { onRemove: { action: 'removed' } },
} as ComponentMeta<typeof Alert>;

/* eslint-disable */
const schema = yup.object().shape({
  wells: yup.array().of(
    yup.object().shape({
      distance_from_previous_location: yup.number().required(),
      distance_to_helicopter_base: yup.number().required(),
      distance_to_psv_base: yup.number().required(),
      distance_to_ahv_base: yup.number().required(),
      distance_to_tug_base: yup.number().required(),
      jackup_positioning_time: yup.number().required(),
      semi_positioning_time: yup.number().required(),
      operational_time: yup.number().required(),
    }),
  ),
});

const Template: ComponentStory<typeof AddedWell> = (props) => (
  <Formik
    initialValues={{
      wells: [
        {
          id: 1,
          name: 'Test well',
          distance_to_ahv_base: '',
          distance_to_psv_base: '',
          distance_to_helicopter_base: '',
          distance_from_previous_location: '',
        },
      ],
    }}
    validationSchema={schema}
    onSubmit={() => undefined}
  >
    <Form layout="vertical">
      <AddedWell {...props} />
    </Form>
  </Formik>
);

export const Default = Template.bind({});
Default.args = {
  isFirst: false,
  isLast: false,
  name: 'wells.0',
};
