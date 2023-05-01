import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Formik } from 'formik';
import BaselineForm from './BaselineForm';
import useAddBaseline from 'pages/Assets/pages/UpdateAsset/hooks/useAddBaseline';
import { rest } from 'msw';
import { AssetModeFactory, AssetPhaseFactory } from 'factories/assets';
import Box from 'components/Box';

export default {
  title: 'pages/UpdateAsset/BaselineForm',
  component: BaselineForm,
  argTypes: {
    onSuccess: { action: 'on success' },
    onSubmit: { action: 'on submit' },
  },
} as ComponentMeta<typeof BaselineForm>;

const modes = AssetModeFactory.buildList(10);
const phases = AssetPhaseFactory.buildList(10);

const Template: ComponentStory<typeof BaselineForm> = (args) => {
  const { onSuccess, onSubmit } = args as unknown as {
    onSuccess: () => void;
    onSubmit: () => void;
  };
  const { validationSchema, initialValues } = useAddBaseline({
    onSuccess: onSuccess,
    assetId: 1,
    initialModes: modes.map((mode) => mode.id),
    initialPhases: phases.map((phase) => phase.id),
  });
  return (
    <Box width={816}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <BaselineForm />
      </Formik>
    </Box>
  );
};

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/emissions/assets/:assetId/modes/`,
        (req, res, ctx) => {
          return res(ctx.json(modes));
        },
      ),
      rest.get(
        `${process.env.REACT_APP_API_BASE_URL}api/tenants/:tenantId/emissions/assets/:assetId/phases/`,
        (req, res, ctx) => {
          return res(ctx.json(phases));
        },
      ),
    ],
  },
};
