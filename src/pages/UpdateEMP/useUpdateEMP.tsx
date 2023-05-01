import { FormValues, schema } from 'containers/EMPForm/EMPBaseForm';
import { emptyFormValues, normalizeFormValues } from 'containers/EMPForm/utils';
import { generatePath, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import useTenant from 'hooks/useTenant';
import { FormikHelpers } from 'formik';
import projectsServices from 'api/services/projects';
import projectsQueryKeys from 'api/queryKeys/projects';
import { notification } from 'antd';
import routes from 'routes';
import { RigType } from 'routes';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import parseISO from 'date-fns/parseISO';
import { useCallback } from 'react';
import { EMP, ConceptEMPElement } from 'api/schema';

const useUpdateEMP = ({
  conceptEMPElements,
  projectId,
  rigId,
  rigType,
  empData,
}: {
  projectId: number;
  rigId: number;
  rigType: RigType;
  empData: EMP | undefined;
  conceptEMPElements: ConceptEMPElement[] | undefined;
}) => {
  const queryClient = useQueryClient();
  const { tenantId } = useTenant();
  const navigate = useNavigate();
  const addedConceptEMPsIds =
    empData?.elements.map((element) => element.concept.id) || [];
  const initialValues: FormValues = {
    name: empData?.name || '',
    description: empData?.description || '',
    api_description: empData?.api_description || '',
    start_date: empData?.start_date ? parseISO(empData?.start_date) : null,
    end_date: empData?.end_date ? parseISO(empData?.end_date) : null,
    total_rig_baseline_average: empData?.total_rig_baseline_average ?? '',
    total_rig_target_average: empData?.total_rig_target_average ?? '',
    addedElements:
      empData?.elements?.map((addedElement) => ({
        id: addedElement.id,
        concept_id: addedElement.concept.id,
        name: addedElement.concept.name,
        baseline_average: addedElement.baseline_average,
        target_average: addedElement.target_average,
        subarea: addedElement.concept.subarea,
        percentage_improvement: addedElement.concept.percentage_improvement,
      })) || [],
    availableElements:
      conceptEMPElements
        ?.filter(
          (empConceptElement) =>
            !addedConceptEMPsIds.includes(empConceptElement.id),
        )
        .map((empConceptElement) => ({
          id: null,
          concept_id: empConceptElement.id,
          name: empConceptElement.name,
          baseline_average: '',
          target_average: '',
          subarea: empConceptElement.subarea,
          percentage_improvement: empConceptElement.percentage_improvement,
        })) || [],
  };
  const mutation = useMutation<
    EMP,
    Error,
    { values: FormValues; formikHelpers: FormikHelpers<FormValues> }
  >(
    async ({ values }) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }

      return await projectsServices.updateEMP({
        tenantId,
        projectId,
        rigId,
        rigType,
        data: normalizeFormValues(values),
      });
    },
    {
      onSuccess: (data) => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }

        queryClient.setQueryData<EMP>(
          projectsQueryKeys.emp({
            tenantId,
            projectId,
            rigId,
            rigType,
          }),
          data,
        );

        notification.success({
          message: 'Saved EMP',
          description: (
            <>
              EMP "<strong>{data.name}</strong>" has been saved.
            </>
          ),
        });
        navigate(
          generatePath(routes.project, { projectId: String(projectId) }),
        );
      },
      onError: (error, { values, formikHelpers }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to save an EMP. Please try later.',
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
        Logger.error(
          `Unable to update an EMP for Rig(id=${rigId}, type=${rigType})`,
          error,
          values,
        );
      },
    },
  );
  const onClear = useCallback(
    (formikHelpers: FormikHelpers<FormValues>) => {
      formikHelpers.resetForm({
        values: emptyFormValues(conceptEMPElements || []),
      });
    },
    [conceptEMPElements],
  );

  return {
    mutation,
    initialValues,
    schema,
    onClear,
  };
};

export default useUpdateEMP;
