import {
  CreateUpdateStudyElement,
  RigTypeEnum,
  StudyElement,
  StudyMetric,
} from 'api/schema';
import { FormValues } from 'pages/Study/StudyElementForm/types';
import { decodeRig, encodeRig, RIG_TYPE_LABEL } from 'utils/rigs';

export const LABELS: Record<keyof FormValues, string> = {
  title: 'Title',
  metric: 'Metric',
  plan: 'Plan',
  rigs: 'Rigs',
};

export const emptyValues: FormValues = {
  title: '',
  metric: null,
  plan: null,
  rigs: [],
};

export const getInitialValues = (element: StudyElement): FormValues => {
  return {
    title: element.title,
    metric: element.metric.key,
    plan: String(element.plan),
    rigs: element.rigs.map((rig) => encodeRig(rig)),
  };
};

export const normalizeFormValues = (
  values: FormValues,
): CreateUpdateStudyElement => {
  return {
    title: values.title,
    metric: values.metric || '',
    plan: Number(values.plan),
    rigs: values.rigs.map((rig) => decodeRig(rig)),
  };
};

const getMetricByKey = (key: string, metrics: StudyMetric[]) =>
  metrics.find((metric) => metric.key === key);

export const isMetricCompatible = (
  key: string,
  rigType: RigTypeEnum,
  metrics: StudyMetric[],
) => Boolean(getMetricByKey(key, metrics)?.compatibility.includes(rigType));

export const filterCompatibleRigs = <T extends { type: RigTypeEnum }>(
  key: string,
  rigs: T[],
  metrics: StudyMetric[],
): T[] => rigs.filter((rig) => isMetricCompatible(key, rig.type, metrics));

export const getCompatibleRigsHint = (key: string, metrics: StudyMetric[]) => {
  const rigTypes = getMetricByKey(key, metrics)?.compatibility || [];
  let adornment = 'rig';

  if (rigTypes.length > 1) {
    adornment = 'rigs';
  }

  return `Compatible with ${rigTypes
    .map((rigType) => RIG_TYPE_LABEL[rigType])
    .join(', ')} ${adornment}.`;
};
