import { FormValues } from 'containers/EMPForm/EMPBaseForm';
import { formatISO } from 'date-fns';
import { CreateUpdateEMP, ConceptEMPElement } from 'api/schema';

export const emptyFormValues = (
  conceptEMPElementsData: ConceptEMPElement[],
): FormValues => {
  return {
    name: '',
    description: '',
    api_description: '',
    start_date: null,
    end_date: null,
    total_rig_baseline_average: '',
    total_rig_target_average: '',
    addedElements: [],
    availableElements:
      conceptEMPElementsData?.map((conceptEMPElement) => ({
        id: null,
        concept_id: conceptEMPElement.id,
        name: conceptEMPElement.name,
        baseline_average: '',
        target_average: '',
        subarea: conceptEMPElement.subarea,
        percentage_improvement: conceptEMPElement.percentage_improvement,
      })) || [],
  };
};

export const normalizeFormValues = (values: FormValues): CreateUpdateEMP => {
  if (!values.start_date) {
    throw new Error('EMP start date cannot be empty');
  }
  if (!values.end_date) {
    throw new Error('EMP end date cannot be empty');
  }

  return {
    name: values.name,
    description: values.description,
    start_date: formatISO(values.start_date, {
      representation: 'date',
    }),
    end_date: formatISO(values.end_date, {
      representation: 'date',
    }),
    total_rig_baseline_average: Number(values.total_rig_baseline_average),
    total_rig_target_average: Number(values.total_rig_target_average),
    api_description: values.api_description,
    elements: values.addedElements.map((empElement) => ({
      id: empElement.id,
      concept_id: empElement.concept_id,
      baseline_average: Number(empElement.baseline_average),
      target_average: Number(empElement.target_average),
    })),
  };
};
