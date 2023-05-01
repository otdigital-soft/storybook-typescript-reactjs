import * as yup from 'yup';
import { LABELS } from './utils';

// TODO: implement dynamic schema that takes metric validation into consideration
export const schema = yup.object().shape({
  title: yup.string().required(`${LABELS.title} is required`),
  metric: yup.string().required(`${LABELS.metric} is required`).nullable(),
  plan: yup.string().required(`${LABELS.plan} is required`).nullable(),
  rigs: yup
    .array()
    .of(yup.string())
    .required(`${LABELS.rigs} are required`)
    .min(1, 'Select at least one rig'),
});
